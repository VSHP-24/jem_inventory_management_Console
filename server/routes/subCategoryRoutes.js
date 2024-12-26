import express from "express";
import {
  getAllSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategoryController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// THESE ROUTES ARE AVAILABLE WITHOUT ANY AUTH
router.route("/").get(getAllSubCategories);
router.route("/:id").get(getSubCategory);

// PROTECTS ALL ROUTES AFTER THIS MIDDLEWARE AND RESTRICTS TO ADMIN
router.use(protect, restrictTo("admin"));

// THESE ROUTES ARE PROTECTED AND RESTRICTS TO ONLY ADMIN
router.route("/").post(createSubCategory);
router.route("/:id").patch(updateSubCategory).delete(deleteSubCategory);

export default router;
