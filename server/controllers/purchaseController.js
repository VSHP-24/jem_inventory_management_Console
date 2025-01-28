/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Purchase from "../models/purchaseModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllPurchases = getAll(Purchase, [
  { path: "part", select: "id name quantity isDeleted " },
]);

export const getPurchase = getOne(Purchase);
export const createPurchase = createOne(Purchase);
export const updatePurchase = updateOne(Purchase);
export const deletePurchase = deleteOne(Purchase);
