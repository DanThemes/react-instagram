import React from "react";
import Posts from "../components/Posts";
import { useParams } from "react-router-dom";
import { useFollowUser, useUnfollowUser, useUser } from "../hooks/users";
import { useAuthContext } from "../context/AuthProvider";
import Loading from "../components/Loading";
import Avatar from "../components/Avatar";

const Profile = () => {
  const { username } = useParams();

  const { user, isLoading, error } = useUser(username);
  const { auth } = useAuthContext();

  if (!user || !auth) {
    return <Loading />;
  }
  console.log(user);
  const isMe = user.uid === auth.user.uid;
  const isFollowing = user.followers.includes(auth.user.uid);

  const handleFollowUser = async () => {
    await useFollowUser(auth.user.uid, user.uid);
  };

  const handleUnfollowUser = async () => {
    await useUnfollowUser(auth.user.uid, user.uid);
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <Avatar user={user} />
        {!isMe &&
          (isFollowing ? (
            <button onClick={handleUnfollowUser}>Unfollow</button>
          ) : (
            <button onClick={handleFollowUser}>Follow</button>
          ))}
      </div>
      <div className="profile-content">
        <Posts uid={user.uid} />
      </div>
    </div>
  );
};

export default Profile;
