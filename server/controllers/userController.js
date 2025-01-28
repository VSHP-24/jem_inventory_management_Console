/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { deleteOne, getAll, getOne } from "./handlerFactory.js";

export const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

///////////////////////////////////////
// CREATE USER IN SIGNUP (NOT THIS)
///////////////////////////////////////

export const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
};

//////////////////////////////////
// SET THE PARAMS ID AS USER ID
//////////////////////////////////

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

//////////////////////////////////
// SET THE USER TO WITH USER ID
//////////////////////////////////

export const setUserId = (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  next();
};

///////////////////////////////////////////////
// SETS NEW CUSTOMER DOCUMENT ID AS USER ID
///////////////////////////////////////////////

export const setCustomerIdSameAsUserId = (req, res, next) => {
  if (!req.body.user) {
    req.body._id = req.user.id;
    req.body.user = req.user.id;
  }
  next();
};

/////////////////////////////
// UPDATE MY PROFILE DATA
/////////////////////////////

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) CREATE ERROR IF USER POSTs PASSWORD DATA
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use / updateMyPassword",
        400
      )
    );
  }

  // 2) FILTER OUT UNWANTED FIELD NAMES,THAT ARE NOT ALLOWED TO BE UPDATED & SET THE FIELDS WHICHEVER CAN BE UPDATED
  const filteredBody = filterObj(req.body, "name", "email", "active");

  // 3) UPDATE USER DOCUMENT
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

////////////////////////
// DELETE MY PROFILE
////////////////////////

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

///////////////////////////////////////////
// UPDATE USER PROFILE (FOR ADMIN ONLY)
///////////////////////////////////////////

export const updateUser = catchAsync(async (req, res, next) => {
  // 1) CREATE ERROR IF USER POSTs PASSWORD DATA
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use / updateMyPassword",
        400
      )
    );
  }

  // 2) FILTER OUT UNWANTED FIELD NAMES,THAT ARE NOT ALLOWED TO BE UPDATED & SET THE FIELDS WHICHEVER CAN BE UPDATED
  const filteredBody = filterObj(req.body, "name", "email", "active");

  // 3) UPDATE USER DOCUMENT
  const updatedUser = await User.findByIdAndUpdate(req.body._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

export const getAllUsers = getAll(User);
export const getUser = getOne(User);
export const deleteUser = deleteOne(User);
