/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Order from "../models/orderModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllOrders = getAll(Order, [
  { path: "user", populate: { path: "user" } },
  {
    path: "orderItems.product",
    populate: [
      { path: "category" },
      { path: "brand" },
      { path: "includedParts.part" },
    ],
  },
]);

export const getOrder = getOne(Order, [
  { path: "user", populate: { path: "user" } },
  {
    path: "orderItems.product",
    populate: [
      { path: "category" },
      { path: "brand" },
      { path: "includedParts.part" },
    ],
  },
  { path: "user.user" },
]);

export const createOrder = createOne(Order);
export const updateOrder = updateOne(Order);
export const deleteOrder = deleteOne(Order);
