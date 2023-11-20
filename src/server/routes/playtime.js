import express from "express";
import * as PlayTimeController from "../controllers/PlayTime.js";

const router = express.Router();

router.delete("/:id", PlayTimeController.deletePlayTime);
router.put("/:id", PlayTimeController.updatePlayTime);
router.post("/", PlayTimeController.createPlayTime);
router.get("/:id", PlayTimeController.getPlayTimeFromUserAndGame);
router.get("/total/:id", PlayTimeController.getTotalPlayTimeFromGame);

export default router;
