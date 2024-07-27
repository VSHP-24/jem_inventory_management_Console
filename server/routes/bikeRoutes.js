import express from "express";
import {
  getAllBikes,
  getBike,
  createBike,
  updateBike,
  deleteBike,
} from "../controllers/bikeController";

const router = express.Router();

router.route("/").get(getAllBikes).post(createBike);
router.route("/:id").get(getBike).patch(updateBike).delete(deleteBike);

export default router;
