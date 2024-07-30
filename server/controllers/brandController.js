/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Brand from "./../models/brandModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

/////////////////////////////////////////////////
//           FETCHES ALL THE BRANDS
/////////////////////////////////////////////////

export const getAllBrands = catchAsync(async (req, res, next) => {
  const brands = await Brand.find();
  res.status(200).json({
    status: "success",
    results: brands.length,
    data: {
      brands,
    },
  });
});

/////////////////////////////////////////////////
//           FETCHES SPECIFIC BRAND
/////////////////////////////////////////////////

export const getBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(
      new AppError(
        "No brand was found with that ID. Please check the ID again",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      brand,
    },
  });
});

/////////////////////////////////////////////////
//           CREATE NEW BRAND
/////////////////////////////////////////////////

export const createBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      brand,
    },
  });
});

/////////////////////////////////////////////////
//           UPDATE SPECIFIC BRAND
/////////////////////////////////////////////////

export const updateBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!brand) {
    return next(
      new AppError(
        "No brand was found with that ID. Please check the ID again",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      brand,
    },
  });
});

/////////////////////////////////////////////////
//           DELETE SPECIFIC BRAND
/////////////////////////////////////////////////

export const deleteBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);

  if (!brand) {
    return next(
      new AppError(
        "No brand was found with that ID. Please check the ID again",
        404
      )
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
