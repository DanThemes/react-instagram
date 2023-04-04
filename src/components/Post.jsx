import React from "react";
import { useDeletePost } from "../hooks/posts";
import { useUser } from "../hooks/users";

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
        <span>{user.username}</span>
        <span onClick={handleDelete} className="delete-button">
          Delete
        </span>
      </div>
      <div className="post-image">
        <img src={post.photo} alt={post.description} />
      </div>

      <div className="post-footer">
        <p className="post-description">{post.description}</p>
      </div>
    </div>
  );
};

export default Post;
