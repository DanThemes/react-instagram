import React from "react";
import { useDeletePost } from "../hooks/posts";
import { useUser } from "../hooks/users";
import { formatDistance } from "date-fns";
import Avatar from "./Avatar";
import { useAuthContext } from "../context/AuthProvider";

const GridPost = ({ post }) => {
  const { user, isLoading, error } = useUser(post.uid);
  const { auth } = useAuthContext();
  const isAuthor = post.uid === auth?.user?.uid;

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return error.message;
  }

  return (
    <div className="post">
      <div className="post-image">
        <img src={post.photo} alt={post.description} />
      </div>
    </div>
  );
};

export default GridPost;
