import React from "react";
import { useUser } from "../../hooks/users";
import { formatDistance } from "date-fns";
import { useDeleteComment, useToggleLikeComment } from "../../hooks/comments";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";

const Comment = ({ comment }) => {
  const { user, isLoading, error } = useUser(comment.uid);

  if (isLoading) {
    return;
  }

  const commentNumber = comment.likes.length;
  const isLiked = comment.likes.includes(user.uid);

  const handleDeleteComment = async () => {
    await useDeleteComment(comment.id);
  };

  const handleToggleLikeComment = async () => {
    await useToggleLikeComment(comment.uid, comment.id);
  };

  return (
    <div className="post-comment">
      <div className="post-comment-content">
        <div className="post-comment-author">
          <strong>{user?.username}</strong>:
        </div>
        <div className="post-comment-text">{comment.comment}</div>
        <div className="post-comment-like" onClick={handleToggleLikeComment}>
          {isLiked ? <HeartIcon /> : <HeartOutlineIcon />}
        </div>
      </div>
      <div className="post-comment-footer">
        <span className="post-comment-footer-date">
          {formatDistance(comment.createdAt, Date.now())}
        </span>
        <span className="post-comment-footer-likes">
          {commentNumber} {commentNumber > 0 ? "likes" : "like"}
        </span>
        <span className="post-comment-footer-reply">Reply</span>
        <span
          className="post-comment-footer-delete"
          onClick={handleDeleteComment}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

export default Comment;
