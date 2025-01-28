import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
} from "../controllers/customerController.js";
import {
  getMe,
  setCustomerIdSameAsUserId,
} from "../controllers/userController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// PROTECTS ALL ROUTES AFTER THIS MIDDLEWARE
router.use(protect);

// THIS GETS PERSONAL DATA
router.route("/me").get(getMe, getCustomer).patch(updateCustomer);

router
  .route("/")
  // THIS ROUTE GETS ALL CUSTOMERS AND RESTRICTS TO ADMIN
  .get(restrictTo("admin"), getAllCustomers)
  // THIS ROUTE CREATES CUSTOMER PROFILE AND SETS THE CUSTOMER PROFILE ID SAME AS USER ID
  .post(restrictTo("customer"), setCustomerIdSameAsUserId, createCustomer);

// THESE ROUTES ARE PROTECTED AND RESTRICTS TO ONLY ADMIN
router.route("/:id").get(restrictTo("admin"), getCustomer);

export default router;
