import express from "express";
import {
  getAllSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategoryController";

const router = express.Router();

router.route("/").get(getAllSubCategories).post(createSubCategory);
router
  .route("/:id")
  .get(getSubCategory)
  .patch(updateSubCategory)
  .delete(deleteSubCategory);

export default router;
