/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Category from "./../models/categoryModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { createOne, deleteOne, updateOne } from "./handlerFactory.js";

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
  const category = await Category.findById(req.params.id).populate("products");

  if (!category) {
    return next(
      new AppError(
        "No category was found with that ID. Please check the ID again",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

export const createCategory = createOne(Category);
export const updateCategory = updateOne(Category);
export const deleteCategory = deleteOne(Category);
