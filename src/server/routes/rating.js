import express from "express";
import * as RatingController from "../controllers/Rating.js";

const router = express.Router();

router.get("/:id", RatingController.getVotesFromGame);
router.delete("/:id", RatingController.deleteVote);
router.put("/:id", RatingController.updateVote);
router.post("/", RatingController.createVote);

export default router;
