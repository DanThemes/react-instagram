import React from "react";
import Posts from "../components/Posts";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/users";
import { useAuthContext } from "../context/AuthProvider";
import Loading from "../components/Loading";
import Avatar from "../components/Avatar";
import { useEffect } from "react";
import FollowUnfollowButton from "../components/FollowUnfollowButton";

const Profile = () => {
  const { username } = useParams();

  const { user, isLoading, error } = useUser(username);
  const { auth } = useAuthContext();

  if (!user || !auth) {
    return <Loading />;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <Avatar user={user} followers={true} following={true} />
      </div>
      <div className="profile-content">
        <Posts uid={user.uid} />
      </div>
    </div>
  );
};

export default Profile;
