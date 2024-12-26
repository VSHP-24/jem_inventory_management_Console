/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import crypto from "crypto";
import { promisify } from "util";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { sendEmail } from "../utils/email.js";

//////////////////////
// CREATES JWT TOKEN
//////////////////////

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//////////////////////////////////
// SENDS JWT TOKEN IN RESPONSE
//////////////////////////////////

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "None",
  };
  cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  // REMOVE PASSWORD FROM OUTPUT
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

//////////////////////////////////
// CREATES NEW CUSTOMER ACCOUNTS
//////////////////////////////////

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

//////////////////////////////////
// CREATES NEW STAFF ACCOUNTS
//////////////////////////////////

export const createStaff = catchAsync(async (req, res, next) => {
  const doc = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: "staff",
  });

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

/////////////////
// LOGIN USERS
/////////////////

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) CHECK IF EMAIL AND PASSWORD EXIST
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // 2) CHECK IF USER EXISTS & PASSWORD IS CORRECT
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) IF EVERYTHING IS OK , SEND TOKEN TO CLIENT
  createSendToken(user, 200, res);
});

/////////////////
// LOGOUT USERS
/////////////////

export const logout = (req, res) => {
  const cookieOptions = {
    expires: new Date(Date.now() - 10 * 1000),
    httpOnly: true,
    sameSite: "None",
  };

  cookieOptions.secure = true;
  res.cookie("jwt", "loggedout", cookieOptions);

  res.status(200).json({ status: "success" });
};

////////////////////////
// AUTHENTICATE USERS
////////////////////////

export const protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) GET TOKEN AND CHECK IF IT'S EXISTS
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  // 2) TOKEN VERIFICATION
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) CHECK IF USER STILL EXISTS
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist ",
        401
      )
    );
  }

  // 4) CHECK IF USER CHANGED PASSWORD AFTER THE TOKEN WAS ISSUED
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! , Please log in again", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTES
  req.user = currentUser;
  next();
});

// THIS RESTRICTS ACCESS TO SPECIFIED ROLES FOR PROTECTED ROUTES
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

////////////////////////
// FORGOT PASSWORD
////////////////////////

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) GET USER BASED ON POSTED EMAIL
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address", 404));
  }

  // 2) GENERATE THE RANDOM RESET TOKEN
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.headers.origin}/resetPassword/${resetToken}`;

  const message = `Forgot your Password? Submit a request with your new Password to: ${resetURL}\n If you didn't forget your passowrd, please ignore this email!`;

  // 3) SEND IT USER'S EMAIL
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (Valid for 10 mins)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch {
    // 4) IF EMAIL SENDING FAILS , DELETE THE RESET TOKEN CREATED
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

////////////////////////
// RESET PASSWORD
////////////////////////

export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) GET USER BASED ON THE TOKEN
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) IF TOKEN HAS NOT EXPIRED AND IF THE USER EXISTS , SET THE NEW PASSWORD
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  // 3) AFTER PASSWORD RESET, RESET TOKEN & RESET EXPIRES WILL BE DELETED
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 4) SEND JWT TOKEN , AFTER PASSWORD RESET
  createSendToken(user, 200, res);
});

////////////////////////
// UPDATE PASSWORD
////////////////////////

export const updatePassword = catchAsync(async (req, res, next) => {
  // 1) GET USER FROM COLLECTION
  const user = await User.findById(req.user.id).select("+password");

  // 2) CHECK IF POSTed CURRENT PASSOWRD IS CORRECT
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) IF SO , UPDATE PASSWORD
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) LOG USER IN , SENT JWT
  createSendToken(user, 200, res);
});
