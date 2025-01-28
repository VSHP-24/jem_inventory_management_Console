import Customer from "../models/customerModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { createOne, deleteOne, getAll, getOne } from "./handlerFactory.js";

export const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

export const getAllCustomers = getAll(Customer, [
  { path: "user" },
  { path: "orderHistory" },
]);

/////////////////////////////
// UPDATE MY PROFILE DATA
/////////////////////////////

export const updateCustomer = catchAsync(async (req, res, next) => {
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
  const filteredBody = filterObj(
    req.body,
    "shippingAddress",
    "shippingCity",
    "shippingState",
    "shippingPostCode",
    "shippingCountry",
    "billingAddress",
    "billingCity",
    "billingState",
    "billingPostCode",
    "billingCountry",
    "phoneNumber"
  );

  // 3) UPDATE USER DOCUMENT
  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedCustomer,
    },
  });
});

export const getCustomer = getOne(Customer, [{ path: "user" }]);
export const createCustomer = createOne(Customer);
export const deleteCustomer = deleteOne(Customer);
