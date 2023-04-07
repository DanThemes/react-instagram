import React from "react";
import Posts from "../components/Posts";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/users";

const Profile = () => {
  const { username } = useParams();

  const { user, isLoading, error } = useUser(username);

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return "Loading";
  }

  return (
    <div>
      {console.log(user)}
      <h1>{username}</h1>

      <Posts uid={user.uid} />
    </div>
  );
};

export default Profile;
