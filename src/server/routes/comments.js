import express from "express";
import * as CommentsController from "../controllers/Comments.js";

const router = express.Router();

router.get("/:id", CommentsController.getComments);
router.delete("/:id", CommentsController.deleteComment);
router.put("/:id", CommentsController.updateComment);
router.post("/", CommentsController.createComment);

export default router;
