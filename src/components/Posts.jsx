import React from "react";
import { usePosts } from "../hooks/posts";
import Post from "./Post";

const Posts = () => {
  const posts = usePosts();

  if (!posts) {
    return "Loading";
  }

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
