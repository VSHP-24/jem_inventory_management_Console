/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Bike from "./../models/bikeModel.js";
import catchAsync from "../utils/catchAsync.js";

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
  const bike = await Bike.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      bike,
    },
  });
});

/////////////////////////////////////////////////
//           CREATE NEW BIKE
/////////////////////////////////////////////////

export const createBike = catchAsync(async (req, res, next) => {
  const bike = await Bike.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      bike,
    },
  });
});

/////////////////////////////////////////////////
//           UPDATE SPECIFIC BIKE
/////////////////////////////////////////////////

export const updateBike = catchAsync(async (req, res, next) => {
  const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      bike,
    },
  });
});

/////////////////////////////////////////////////
//           DELETE SPECIFIC BIKE
/////////////////////////////////////////////////

export const deleteBike = catchAsync(async (req, res, next) => {
  await Bike.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
