import React from "react";
import { useUser } from "../../hooks/users";

const Comment = ({ comment }) => {
  const { user } = useUser(comment.uid);

  return (
    <div className="post-comment">
      <div className="post-comment-author">{user?.username}</div>
      <div className="post-comment-content">{comment.comment}</div>
    </div>
  );
};

export default Comment;
