import React, { useState } from "react";
import { useUser } from "../../hooks/users";
import { formatDistance } from "date-fns";
import {
  useComments,
  useDeleteComment,
  useToggleLikeComment,
} from "../../hooks/comments";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../../context/AuthProvider";
import Popup from "reactjs-popup";
import UsersList from "../UsersList";
import { Link } from "react-router-dom";
import NewComment from "./NewComment";

const Comment = ({ comment }) => {
  const [showNewReply, setShowNewReply] = useState(false);
  const { user, isLoading } = useUser(comment.uid);
  const {
    auth,
    auth: { isloading: isAuthLoading },
  } = useAuthContext();
  const isAuthor = comment.uid === auth?.user?.uid;

  const { comments, isLoading: areCommentsLoading } = useComments(
    null,
    comment.id
  );

  const isReply = !!comment.cid;

  if (isLoading || isAuthLoading || areCommentsLoading) {
    return;
  }

  const commentNumber = comment.likes.length;
  const isLiked = comment.likes.includes(auth.user.uid);

  const handleDeleteComment = async () => {
    await useDeleteComment(auth.user.uid, comment.id);
  };

  const handleToggleLikeComment = async () => {
    await useToggleLikeComment(auth.user.uid, comment);
  };

  return (
    <div className="post-comment">
      <div className="post-comment-header">
        <div className="post-comment-content">
          <span className="post-comment-author">
            <Link to={`/profile/${user?.username}`} className="avatar-username">
              <strong>{user?.username}</strong> {comment.id}
            </Link>
            :
          </span>
          <span className="post-comment-text">{comment.comment}</span>
        </div>
        <div className="post-comment-like" onClick={handleToggleLikeComment}>
          {isLiked ? (
            <HeartIcon className="liked" />
          ) : (
            <HeartOutlineIcon className="not-liked" />
          )}
        </div>
      </div>
      <div className="post-comment-footer">
        <span className="post-comment-footer-date">
          {formatDistance(comment.createdAt, Date.now())} ago
        </span>
        <span className="post-comment-footer-likes">
          {commentNumber ? (
            <Popup
              trigger={
                <p className="link">
                  {commentNumber} {commentNumber === 1 ? "like" : "likes"}
                </p>
              }
              position="right center"
              modal
            >
              {(close) => <UsersList list={comment.likes} close={close} />}
            </Popup>
          ) : (
            `${commentNumber} ${commentNumber === 1 ? "like" : "likes"}`
          )}
        </span>
        <span
          className="link post-comment-footer-reply"
          onClick={() => setShowNewReply((prev) => !prev)}
        >
          Reply
        </span>
        {isAuthor && (
          <span
            className="link post-comment-footer-delete"
            onClick={handleDeleteComment}
          >
            Delete
          </span>
        )}
      </div>

      <div className="post-comment-replies">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>

      <div className="post-comment-new-reply">
        {showNewReply && (
          <NewComment uid={auth.user.uid} parentComment={comment} />
        )}
      </div>
    </div>
  );
};

export default Comment;
