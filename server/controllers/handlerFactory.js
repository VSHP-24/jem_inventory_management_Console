/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

/////////////////////////////////////////////////
//            CREATE NEW MODEL
/////////////////////////////////////////////////

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

/////////////////////////////////////////////////
//           UPDATE SPECIFIC MODEL
/////////////////////////////////////////////////

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError(
          "No document was found with that ID. Please check the ID again",
          404
        )
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

/////////////////////////////////////////////////
//           DELETE SPECIFIC MODEL
/////////////////////////////////////////////////

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(
          `No document was found with that ID. Please check the ID again`,
          404
        )
      );
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
