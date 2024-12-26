/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Bike from "./../models/bikeModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllBikes = getAll(Bike, [
  { path: "brand", select: "id name isDeleted slug" },
  { path: "products", select: "id name isDeleted slug" },
]);

export const getBike = getOne(Bike, [
  { path: "brand", select: "id name isDeleted slug" },
  { path: "products", select: "id name isDeleted slug" },
]);

export const createBike = createOne(Bike);
export const updateBike = updateOne(Bike);
export const deleteBike = deleteOne(Bike);
