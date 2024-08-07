/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Product from "./../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { createOne, deleteOne, updateOne } from "./handlerFactory.js";

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

  if (!product) {
    return next(
      new AppError(
        "No product was found with that ID. Please check the ID again",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

export const createProduct = createOne(Product);
export const updateProduct = updateOne(Product);
export const deleteProduct = deleteOne(Product);
