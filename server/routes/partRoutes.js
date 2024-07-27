import express from "express";
import {
  getAllParts,
  getPart,
  createPart,
  updatePart,
  deletePart,
} from "../controllers/partController";

const router = express.Router();

router.route("/").get(getAllParts).post(createPart);
router.route("/:id").get(getPart).patch(updatePart).delete(deletePart);

export default router;
