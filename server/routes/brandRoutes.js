import express from "express";
import {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";

const router = express.Router();

router.route("/").get(getAllBrands).post(createBrand);
router.route("/:id").get(getBrand).patch(updateBrand).delete(deleteBrand);

export default router;
