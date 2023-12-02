import express from "express";
import * as GameInfoController from "../controllers/GameInfo.js";

const router = express.Router();

router.post("/", GameInfoController.createGame);
router.delete("/:id", GameInfoController.deleteGame);
router.put("/:id", GameInfoController.updateGame);
router.get("/", GameInfoController.getGames);
router.get("/popularbyage", GameInfoController.getPopularGamesFromAgeRange);
router.get("/best", GameInfoController.getBestGames);
router.get("/all", GameInfoController.getAllGames);
router.get("/:id", GameInfoController.getGameById);
router.get("/gameratings/:id", GameInfoController.retrieveGameRatings);

export default router;
