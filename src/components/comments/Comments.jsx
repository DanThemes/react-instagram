import React from "react";
import Comment from "./Comment";
import { useComments } from "../../hooks/comments";

const Comments = ({ pid }) => {
  const { comments, isLoading } = useComments(pid);

  if (isLoading) {
    return "Loading";
  }

  if (!isLoading && !comments.length) {
    return <div className="post-comments">No comments.</div>;
  }

  return (
    <div className="post-comments">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
