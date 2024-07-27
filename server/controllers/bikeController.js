/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Bike from "./../models/bikeModel.js";

/////////////////////////////////////////////////
//           FETCHES ALL THE BIKES
/////////////////////////////////////////////////

export async function getAllBikes(req, res) {
  try {
    const bikes = await Bike.find();
    res.status(200).json({
      status: "success",
      results: bikes.length,
      data: {
        bikes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

/////////////////////////////////////////////////
//           FETCHES SPECIFIC BIKE
/////////////////////////////////////////////////

export async function getBike(req, res) {
  try {
    const bike = await Bike.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        bike,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

/////////////////////////////////////////////////
//           CREATE NEW BIKE
/////////////////////////////////////////////////

export async function createBike(req, res) {
  try {
    const bike = await Bike.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        bike,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

/////////////////////////////////////////////////
//           UPDATE SPECIFIC BIKE
/////////////////////////////////////////////////

export async function updateBike(req, res) {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

/////////////////////////////////////////////////
//           DELETE SPECIFIC BIKE
/////////////////////////////////////////////////

export async function deleteBike(req, res) {
  try {
    await Bike.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}
