import React from "react";
import { useDeletePost } from "../hooks/posts";
import { useUser } from "../hooks/users";
import { formatDistance } from "date-fns";
import Avatar from "./Avatar";

const Post = ({ post }) => {
  const { user, isLoading, error } = useUser(post.uid);

  // console.log(post);
  const handleDelete = async () => {
    await useDeletePost(post);
  };

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return { error };
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header-left">
          <Avatar />
          {user.username}
        </div>
        <div className="post-header-right" onClick={handleDelete}>
          <span className="delete-button">Delete</span>
        </div>
      </div>
      <div className="post-image">
        <img src={post.photo} alt={post.description} />
      </div>

      <div className="post-footer">
        <p className="post-description">
          <strong>{user.username}</strong> {post.description}
        </p>
        <p className="post-date">
          {formatDistance(post.createdAt, Date.now())}
        </p>
      </div>
    </div>
  );
};

export default Post;
