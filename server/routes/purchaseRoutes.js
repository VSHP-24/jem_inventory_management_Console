import express from "express";
import {
  getAllPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
} from "../controllers/purchaseController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// PROTECTS ALL ROUTES AFTER THIS MIDDLEWARE AND RESTRICTS TO ADMIN & STAFF
router.use(protect, restrictTo("admin", "staff"));

// THESE ROUTES ARE PROTECTED AND RESTRICTS TO ONLY ADMIN & STAFF
router.route("/").get(getAllPurchases).post(createPurchase);

router
  .route("/:id")
  .get(getPurchase)
  .patch(updatePurchase)
  .delete(deletePurchase);

export default router;
