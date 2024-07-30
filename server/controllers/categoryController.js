/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Category from "./../models/categoryModel.js";
import catchAsync from "../utils/catchAsync.js";

/////////////////////////////////////////////////
//           FETCHES ALL THE CATEGORIES
/////////////////////////////////////////////////

export const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: "success",
    results: categories.length,
    data: {
      categories,
    },
  });
});

/////////////////////////////////////////////////
//           FETCHES SPECIFIC CATEGORY
/////////////////////////////////////////////////

export const getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

/////////////////////////////////////////////////
//           CREATE NEW CATEGORY
/////////////////////////////////////////////////

export const createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});

/////////////////////////////////////////////////
//           UPDATE SPECIFIC CATEGORY
/////////////////////////////////////////////////

export const updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

/////////////////////////////////////////////////
//           DELETE SPECIFIC CATEGORY
/////////////////////////////////////////////////

export const deleteCategory = catchAsync(async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
