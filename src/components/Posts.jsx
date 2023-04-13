import React from "react";
import { usePosts } from "../hooks/posts";
import ListPost from "./ListPost";
import GridPost from "./GridPost";
import Loading from "./Loading";

const Posts = ({ style = "list", showOnlyPostsOfUsersFollowed }) => {
  const { posts, isLoading } = usePosts(showOnlyPostsOfUsersFollowed);

  if (isLoading) {
    return <Loading />;
  }

  // Grid Posts
  if (style === "grid") {
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
