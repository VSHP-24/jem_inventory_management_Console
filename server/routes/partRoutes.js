import express from "express";
import {
  getAllParts,
  getPart,
  createPart,
  updatePart,
  deletePart,
} from "../controllers/partController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// THESE ROUTES ARE AVAILABLE WITHOUT ANY AUTH
router.route("/").get(getAllParts);
router.route("/:id").get(getPart);

// PROTECTS ALL ROUTES AFTER THIS MIDDLEWARE AND RESTRICTS TO ADMIN
router.use(protect, restrictTo("admin"));

// THESE ROUTES ARE PROTECTED AND RESTRICTS TO ONLY ADMIN
router.route("/").post(createPart);
router.route("/:id").patch(updatePart).delete(deletePart);

export default router;
