import Customer from "../models/customerModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllCustomers = getAll(Customer, [
  { path: "user" },
  { path: "orderHistory" },
]);

export const getCustomer = getOne(Customer, [{ path: "user" }]);
export const createCustomer = createOne(Customer);
export const updateCustomer = updateOne(Customer);
export const deleteCustomer = deleteOne(Customer);
