/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Category from "./../models/categoryModel.js";

/////////////////////////////////////////////////
//           FETCHES ALL THE CATEGORIES
/////////////////////////////////////////////////

export async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "success",
      results: categories.length,
      data: {
        categories,
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
//           FETCHES SPECIFIC CATEGORY
/////////////////////////////////////////////////

export async function getCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        category,
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
//           CREATE NEW CATEGORY
/////////////////////////////////////////////////

export async function createCategory(req, res) {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        category,
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
//           UPDATE SPECIFIC CATEGORY
/////////////////////////////////////////////////

export async function updateCategory(req, res) {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

/////////////////////////////////////////////////
//           DELETE SPECIFIC CATEGORY
/////////////////////////////////////////////////

export async function deleteCategory(req, res) {
  try {
    await Category.findByIdAndDelete(req.params.id);
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
