import React from "react";
import Comment from "./Comment";
import { useComments } from "../../hooks/comments";

const Comments = ({ pid }) => {
  const comments = useComments(pid);

  return (
    <div className="post-comments">
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
