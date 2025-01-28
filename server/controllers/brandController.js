/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Brand from "./../models/brandModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllBrands = getAll(Brand, [
  { path: "models" },
  { path: "products" },
]);

export const getBrand = getOne(Brand, [
  { path: "models" },
  { path: "products" },
]);

export const createBrand = createOne(Brand);
export const updateBrand = updateOne(Brand);
export const deleteBrand = deleteOne(Brand);
