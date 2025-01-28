import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// THESE ROUTES ARE AVAILABLE WITHOUT ANY AUTH
router.route("/").get(getAllProducts);
router.route("/:id").get(getProduct);

// PROTECTS ALL ROUTES AFTER THIS MIDDLEWARE AND RESTRICTS TO ADMIN
router.use(protect, restrictTo("admin"));

// THESE ROUTES ARE PROTECTED AND RESTRICTS TO ONLY ADMIN
router.route("/").post(createProduct);
router.route("/:id").patch(updateProduct).delete(deleteProduct);

export default router;
