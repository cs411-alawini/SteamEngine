import React from "react";
import CommentForm from "./CommentForm";

const CommentsSection = ({ loggedIn, comments, ratingsData, onSubmit }) => {
  return (
    <div className="comment-wrapper">
      <b>Comments ({comments.length}):</b>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <b>{ratingsData.Usernames[index]}:</b> {comment}
        </div>
      ))}
      {loggedIn && <CommentForm onSubmit={onSubmit} />}
    </div>
  );
};

export default CommentsSection;
