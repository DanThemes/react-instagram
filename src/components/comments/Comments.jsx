import React from "react";
import Comment from "./Comment";

const Comments = ({ comments }) => {
  return (
    <div className="post-comments">
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
