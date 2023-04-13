import React from "react";
import NewPost from "../components/NewPost";
import Posts from "../components/Posts";
import { useAuthContext } from "../context/AuthProvider";
import Loading from "../components/Loading";

const Home = () => {
  const { auth } = useAuthContext();

  if (!auth) {
    return <Loading />;
  }

  return (
    <div>
      <NewPost />
      <Posts style="list" showOnlyPostsOfUsersFollowed={true} />
    </div>
  );
};

export default Home;
