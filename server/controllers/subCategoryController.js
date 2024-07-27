/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import SubCategory from "./../models/subCategoryModel.js";

/////////////////////////////////////////////////
//         FETCHES ALL THE SUBCATEGORIES
/////////////////////////////////////////////////

export async function getAllSubCategories(req, res) {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json({
      status: "success",
      results: subCategories.length,
      data: {
        subCategories,
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
//         FETCHES SPECIFIC SUBCATEGORY
/////////////////////////////////////////////////

export async function getSubCategory(req, res) {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        subCategory,
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
//            CREATE NEW SUBCATEGORY
/////////////////////////////////////////////////

export async function createSubCategory(req, res) {
  try {
    const subCategory = await SubCategory.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        subCategory,
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
//          UPDATE SPECIFIC SUBCATEGORY
/////////////////////////////////////////////////

export async function updateSubCategory(req, res) {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        subCategory,
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
//          DELETE SPECIFIC SUBCATEGORY
/////////////////////////////////////////////////

export async function deleteSubCategory(req, res) {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
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
