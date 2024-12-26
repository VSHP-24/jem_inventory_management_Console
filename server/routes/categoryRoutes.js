import express from "express";
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// THESE ROUTES ARE AVAILABLE WITHOUT ANY AUTH
router.route("/").get(getAllCategories);
router.route("/:id").get(getCategory);

// PROTECTS ALL ROUTES AFTER THIS MIDDLEWARE AND RESTRICTS TO ADMIN
router.use(protect, restrictTo("admin"));

// THESE ROUTES ARE PROTECTED AND RESTRICTS TO ONLY ADMIN
router.route("/").post(createCategory);
router.route("/:id").patch(updateCategory).delete(deleteCategory);

export default router;
