/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import SubCategory from "./../models/subCategoryModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

/////////////////////////////////////////////////
//         FETCHES ALL THE SUBCATEGORIES
/////////////////////////////////////////////////

export const getAllSubCategories = catchAsync(async (req, res, next) => {
  const subCategories = await SubCategory.find();
  res.status(200).json({
    status: "success",
    results: subCategories.length,
    data: {
      subCategories,
    },
  });
});

/////////////////////////////////////////////////
//         FETCHES SPECIFIC SUBCATEGORY
/////////////////////////////////////////////////

export const getSubCategory = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id);

  if (!subCategory) {
    return next(
      new AppError(
        "No SubCategory was found with that ID. Please check the ID again",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      subCategory,
    },
  });
});

/////////////////////////////////////////////////
//            CREATE NEW SUBCATEGORY
/////////////////////////////////////////////////

export const createSubCategory = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      subCategory,
    },
  });
});

/////////////////////////////////////////////////
//          UPDATE SPECIFIC SUBCATEGORY
/////////////////////////////////////////////////

export const updateSubCategory = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!subCategory) {
    return next(
      new AppError(
        "No SubCategory was found with that ID. Please check the ID again",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      subCategory,
    },
  });
});

/////////////////////////////////////////////////
//          DELETE SPECIFIC SUBCATEGORY
/////////////////////////////////////////////////

export const deleteSubCategory = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

  if (!subCategory) {
    return next(
      new AppError(
        "No SubCategory was found with that ID. Please check the ID again",
        404
      )
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
