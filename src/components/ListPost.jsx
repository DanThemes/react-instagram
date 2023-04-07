import React from "react";
import { useDeletePost } from "../hooks/posts";
import { useUser } from "../hooks/users";
import { formatDistance } from "date-fns";
import Avatar from "./Avatar";
import { useAuthContext } from "../context/AuthProvider";
import NewComment from "./comments/NewComment";
import Comments from "./comments/Comments";

const Post = ({ post }) => {
  const { user, isLoading, error } = useUser(post.uid);
  const { auth } = useAuthContext();
  const isAuthor = post.uid === auth?.user?.uid;

  // console.log(post);
  const handleDelete = async () => {
    await useDeletePost(auth?.user?.uid, post);
  };

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return error.message;
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header-left">
          <Avatar uid={post.uid} size="small" />
        </div>
        <div className="post-header-right" onClick={handleDelete}>
          {isAuthor && <span className="delete-button">Delete</span>}
        </div>
      </div>
      <div className="post-image">
        <img src={post.photo} alt={post.description} />
      </div>

      <div className="post-footer">
        <div className="post-content">
          <p className="post-description">
            <strong>{user.username}</strong> {post.description}
          </p>
          <p className="post-date">
            {formatDistance(post.createdAt, Date.now())} ago
          </p>
        </div>

        {auth.user && <NewComment uid={auth?.user?.uid} pid={post.id} />}

        <Comments comments={post.comments || []} />
      </div>
    </div>
  );
};

export default Post;
