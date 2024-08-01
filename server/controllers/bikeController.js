/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Bike from "./../models/bikeModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { createOne, deleteOne, updateOne } from "./handlerFactory.js";

/////////////////////////////////////////////////
//           FETCHES ALL THE BIKES
/////////////////////////////////////////////////

export const getAllBikes = catchAsync(async (req, res, next) => {
  const bikes = await Bike.find();
  res.status(200).json({
    status: "success",
    results: bikes.length,
    data: {
      bikes,
    },
  });
});

/////////////////////////////////////////////////
//           FETCHES SPECIFIC BIKE
/////////////////////////////////////////////////

export const getBike = catchAsync(async (req, res, next) => {
  const bike = await Bike.findById(req.params.id).populate("products");

  if (!bike) {
    return next(
      new AppError(
        "No bike was found with that ID. Please check the ID again",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      bike,
    },
  });
});

export const createBike = createOne(Bike);
export const updateBike = updateOne(Bike);
export const deleteBike = deleteOne(Bike);
