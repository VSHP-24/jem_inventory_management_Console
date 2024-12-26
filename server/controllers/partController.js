/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Part from "./../models/partModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllParts = getAll(Part, [
  { path: "products", select: "id name isDeleted " },
]);

export const getPart = getOne(Part, [
  { path: "products", select: `id name isDeleted ` },
]);

export const createPart = createOne(Part);
export const updatePart = updateOne(Part);
export const deletePart = deleteOne(Part);
