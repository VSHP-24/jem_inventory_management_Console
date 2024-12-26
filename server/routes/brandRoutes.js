import express from "express";
import {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// THESE ROUTES ARE AVAILABLE WITHOUT ANY AUTH
router.route("/").get(getAllBrands);
router.route("/:id").get(getBrand);

// PROTECTS ALL ROUTES AFTER THIS MIDDLEWARE AND RESTRICTS TO ADMIN
router.use(protect, restrictTo("admin"));

// THESE ROUTES ARE PROTECTED AND RESTRICTS TO ONLY ADMIN
router.route("/").post(createBrand);
router.route("/:id").patch(updateBrand).delete(deleteBrand);

export default router;
