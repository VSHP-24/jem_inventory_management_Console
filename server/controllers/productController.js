/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Product from "./../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";

/////////////////////////////////////////////////
//           FETCHES ALL THE PRODUCTS
/////////////////////////////////////////////////

export const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

/////////////////////////////////////////////////
//           FETCHES SPECIFIC PRODUCT
/////////////////////////////////////////////////

export const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

/////////////////////////////////////////////////
//           CREATE NEW PRODUCT
/////////////////////////////////////////////////

export const createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});

/////////////////////////////////////////////////
//           UPDATE SPECIFIC PRODUCT
/////////////////////////////////////////////////

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

/////////////////////////////////////////////////
//           DELETE SPECIFIC PRODUCT
/////////////////////////////////////////////////

export const deleteProduct = catchAsync(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
