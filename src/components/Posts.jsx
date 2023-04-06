import React from "react";
import { usePosts } from "../hooks/posts";
import Post from "./Post";

const Posts = ({ uid = null }) => {
  const posts = usePosts(uid);

  if (!posts) {
    return "Loading";
  }

  console.log(uid);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
