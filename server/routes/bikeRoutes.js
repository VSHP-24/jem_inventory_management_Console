import express from "express";
import {
  getAllBikes,
  getBike,
  createBike,
  updateBike,
  deleteBike,
} from "../controllers/bikeController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// THESE ROUTES ARE AVAILABLE WITHOUT ANY AUTH
router.route("/").get(getAllBikes);
router.route("/:id").get(getBike);

// PROTECTS ALL ROUTES AFTER THIS MIDDLEWARE AND RESTRICTS TO ADMIN
router.use(protect, restrictTo("admin"));

// THESE ROUTES ARE PROTECTED AND RESTRICTS TO ONLY ADMIN
router.route("/").post(createBike);
router.route("/:id").patch(updateBike).delete(deleteBike);

export default router;
