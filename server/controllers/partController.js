/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Part from "./../models/partModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { createOne, deleteOne, updateOne } from "./handlerFactory.js";

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

export const createPart = createOne(Part);
export const updatePart = updateOne(Part);
export const deletePart = deleteOne(Part);
