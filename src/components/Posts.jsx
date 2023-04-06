import React from "react";
import { usePosts } from "../hooks/posts";
import ListPost from "./ListPost";
import GridPost from "./GridPost";

const Posts = ({ uid = null }) => {
  const posts = usePosts(uid);

  if (!posts) {
    return "Loading";
  }

  // Grid Posts
  if (uid) {
    return (
      <div className="grid-posts">
        {posts.map((post) => (
          <GridPost key={post.id} post={post} />
        ))}
      </div>
    );
  }

  // List Posts
  return (
    <div className="list-posts">
      {posts.map((post) => (
        <ListPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
