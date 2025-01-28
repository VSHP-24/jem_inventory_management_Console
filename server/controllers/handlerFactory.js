/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

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
    const filteredBody = filterObj(req.body, "active", "isDeleted");

    const doc = await Model.findByIdAndUpdate(req.body.id, filteredBody);

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

/////////////////////////////////////////////////
//            GET ONE MODEL
/////////////////////////////////////////////////

export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;
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
//            GET ALL  MODEL
/////////////////////////////////////////////////

export const getAll = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find();
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
