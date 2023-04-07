import React from "react";
import { useUser } from "../../hooks/users";
import { formatDistance } from "date-fns";
import { useDeleteComment, useToggleLikeComment } from "../../hooks/comments";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../../context/AuthProvider";

const Comment = ({ comment }) => {
  const { user, isLoading } = useUser(comment.uid);
  const {
    auth,
    auth: { isloading: isAuthLoading },
  } = useAuthContext();

  if (isLoading || isAuthLoading) {
    return;
  }

  const commentNumber = comment.likes.length;
  const isLiked = comment.likes.includes(auth.user.uid);

  const handleDeleteComment = async () => {
    await useDeleteComment(comment.id);
  };

  const handleToggleLikeComment = async () => {
    await useToggleLikeComment(auth.user.uid, comment.id);
  };

  return (
    <div className="post-comment">
      <div className="post-comment-header">
        <div className="post-comment-content">
          <span className="post-comment-author">
            <strong>{user?.username}</strong>:
          </span>
          <span className="post-comment-text">{comment.comment}</span>
        </div>
        <div className="post-comment-like" onClick={handleToggleLikeComment}>
          {isLiked ? <HeartIcon /> : <HeartOutlineIcon />}
        </div>
      </div>
      <div className="post-comment-footer">
        <span className="post-comment-footer-date">
          {formatDistance(comment.createdAt, Date.now())}
        </span>
        <span className="post-comment-footer-likes">
          {commentNumber} {commentNumber === 1 ? "like" : "likes"}
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
