import React from "react";
import Comment from "./Comment";
import { useComments } from "../../hooks/comments";
import Loading from "../Loading";

const Comments = ({ pid }) => {
  const { comments } = useComments(pid);

  if (!comments) {
    return [];
  }

  return (
    <div
      className={`post-comments ${
        !comments.length ? "posts-comments-none" : ""
      }`}
    >
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
