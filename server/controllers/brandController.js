/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Brand from "./../models/brandModel.js";

/////////////////////////////////////////////////
//           FETCHES ALL THE BRANDS
/////////////////////////////////////////////////

export async function getAllBrands(req, res) {
  try {
    const brands = await Brand.find();
    res.status(200).json({
      status: "success",
      results: brands.length,
      data: {
        brands,
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
//           FETCHES SPECIFIC BRAND
/////////////////////////////////////////////////

export async function getBrand(req, res) {
  try {
    const brand = await Brand.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        brand,
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
//           CREATE NEW BRAND
/////////////////////////////////////////////////

export async function createBrand(req, res) {
  try {
    const brand = await Brand.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        brand,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
}

/////////////////////////////////////////////////
//           UPDATE SPECIFIC BRAND
/////////////////////////////////////////////////

export async function updateBrand(req, res) {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        brand,
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
//           DELETE SPECIFIC BRAND
/////////////////////////////////////////////////

export async function deleteBrand(req, res) {
  try {
    await Brand.findByIdAndDelete(req.params.id);
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
