import express from "express";
import * as UserController from "../controllers/UserProfile.js";

const router = express.Router();

router.get("/:id", UserController.getUserInfo);
router.get("/login/:id", UserController.login);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUserInfo);
router.delete("/:id", UserController.deleteUser);
router.get("/upvoted/:id", UserController.getUpvotedGames);
router.get("/played/:id", UserController.getPlayedGames);

export default router;