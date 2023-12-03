import * as Comments from "../models/Comments.js";

export const getComments = async (req, res) => {
  try {
    const results = await Comments.get(req.params.id);
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await Comments.remove(req.params.id);
    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateComment = async (req, res) => {
  const { GameID, Username, CommentText } = req.body;
  try {
    await Comments.update(req.params.id, { GameID, Username, CommentText });
    res.status(200).json({ message: "Comment updated successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createComment = async (req, res) => {
  const { GameID, Username, CommentText } = req.body;
  try {
    const commentID = await Comments.add({ GameID, Username, CommentText });
    res.status(200).json({
      newCommentID: commentID,
      message: "Comment created successfully.",
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};