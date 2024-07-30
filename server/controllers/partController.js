/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Part from "./../models/partModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

/////////////////////////////////////////////////
//           FETCHES ALL THE PARTS
/////////////////////////////////////////////////

export const getAllParts = catchAsync(async (req, res, next) => {
  const parts = await Part.find();
  res.status(200).json({
    status: "success",
    results: parts.length,
    data: {
      parts,
    },
  });
});

/////////////////////////////////////////////////
//           FETCHES SPECIFIC PART
/////////////////////////////////////////////////

export const getPart = catchAsync(async (req, res, next) => {
  const part = await Part.findById(req.params.id);

  if (!part) {
    return next(
      new AppError(
        "No part was found with that ID. Please check the ID again",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      part,
    },
  });
});

/////////////////////////////////////////////////
//           CREATE NEW PART
/////////////////////////////////////////////////

export const createPart = catchAsync(async (req, res, next) => {
  const part = await Part.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      part,
    },
  });
});

/////////////////////////////////////////////////
//           UPDATE SPECIFIC PART
/////////////////////////////////////////////////

export const updatePart = catchAsync(async (req, res, next) => {
  const part = await Part.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!part) {
    return next(
      new AppError(
        "No part was found with that ID. Please check the ID again",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: { part },
  });
});

/////////////////////////////////////////////////
//           DELETE SPECIFIC PART
/////////////////////////////////////////////////

export const deletePart = catchAsync(async (req, res, next) => {
  const part = await Part.findByIdAndDelete(req.params.id);

  if (!part) {
    return next(
      new AppError(
        "No part was found with that ID. Please check the ID again",
        404
      )
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
