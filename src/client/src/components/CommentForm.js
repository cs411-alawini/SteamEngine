import React, { useState } from "react";
import "./CommentForm.css";

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
    setComment("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-textarea"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Write a comment..."
      />
      <button className="comment-submit" type="submit">
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
