/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Product from "./../models/productModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllProducts = getAll(Product, [
  { path: "brand", select: "id name isDeleted slug" },
  { path: "model", select: "id name isDeleted slug" },
  { path: "category", select: "id name isDeleted slug" },
  { path: "subCategory", select: "id name isDeleted slug" },
  { path: "includedParts.part", select: "id name isDeleted slug" },
]);

export const getProduct = getOne(Product, [
  { path: "brand", select: "id name isDeleted slug" },
  { path: "model", select: "id name isDeleted slug" },
  { path: "category", select: "id name isDeleted slug" },
  { path: "subCategory", select: "id name isDeleted slug" },
  { path: "includedParts.part", select: "id name isDeleted slug" },
]);

export const createProduct = createOne(Product);
export const updateProduct = updateOne(Product);
export const deleteProduct = deleteOne(Product);
