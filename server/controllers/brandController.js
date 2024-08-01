/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Brand from "./../models/brandModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { createOne, deleteOne, updateOne } from "./handlerFactory.js";

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
  const brand = await Brand.findById(req.params.id).populate([
    "products",
    "models",
  ]);

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

export const createBrand = createOne(Brand);
export const updateBrand = updateOne(Brand);
export const deleteBrand = deleteOne(Brand);
