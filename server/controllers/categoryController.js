/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Category from "./../models/categoryModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllCategories = getAll(Category, [
  { path: "subCategories" },
  { path: "products" },
]);

export const getCategory = getOne(Category, [
  { path: "subCategories" },
  { path: "products" },
]);

export const createCategory = createOne(Category);
export const updateCategory = updateOne(Category);
export const deleteCategory = deleteOne(Category);
