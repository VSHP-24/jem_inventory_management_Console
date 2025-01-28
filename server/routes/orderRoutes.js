import express from "express";
import {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getAllOrdersByCustomer,
} from "../controllers/orderController.js";
import { protect, restrictTo } from "../controllers/authController.js";
import { getMe, setUserId } from "../controllers/userController.js";

const router = express.Router();

// PROTECTS ALL ROUTES AFTER THIS MIDDLEWARE
router.use(protect);

// THIS ROUTE IS PROTECTED AND FILTERS ORDERS BY CUSTOMER ID
router
  .route("/myOrders")
  .get(restrictTo("customer"), getMe, getAllOrdersByCustomer);

// THESE ROUTES ARE PROTECTED
router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);

// THESE ROUTES ARE PROTECTED AND RESTRICTS TO ONLY ADMIN
router.route("/").get(restrictTo("admin"), getAllOrders);

// THESE ROUTES ARE PROTECTED AND RESTRICTS TO ONLY CUSTOMERS
router.route("/").post(restrictTo("customer"), setUserId, createOrder);

export default router;
