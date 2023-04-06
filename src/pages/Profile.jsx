import React from "react";
import Posts from "../components/Posts";
import { useAuthContext } from "../context/AuthProvider";

const Profile = () => {
  const {
    auth: { user, isLoading, error },
  } = useAuthContext();

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return "Loading";
  }

  return (
    <div>
      <h1>Profile</h1>

      <Posts uid={user.uid} />
    </div>
  );
};

export default Profile;
