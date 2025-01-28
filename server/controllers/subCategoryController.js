/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import SubCategory from "./../models/subCategoryModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllSubCategories = getAll(SubCategory, [
  { path: "category", select: "id name isDeleted  slug" },
  { path: "products", select: "id name isDeleted slug" },
]);

export const getSubCategory = getOne(SubCategory, [
  { path: "category", select: "id name isDeleted slug" },
  { path: "products", select: "id name isDeleted slug" },
]);

export const createSubCategory = createOne(SubCategory);
export const updateSubCategory = updateOne(SubCategory);
export const deleteSubCategory = deleteOne(SubCategory);
