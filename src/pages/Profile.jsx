import React from "react";
import Posts from "../components/Posts";
import { useParams } from "react-router-dom";
import { useFollowUser, useUnfollowUser, useUser } from "../hooks/users";
import { useAuthContext } from "../context/AuthProvider";
import Loading from "../components/Loading";
import Avatar from "../components/Avatar";
import { useState } from "react";
import { useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(null);
  const [isLoadingFollowing, setIsLoadingFollowing] = useState(false);

  const { username } = useParams();

  const { user, isLoading, error } = useUser(username);
  const { auth } = useAuthContext();

  useEffect(() => {
    if (!user || !auth) return;

    setIsFollowing(auth.user.following.includes(user.uid));
  }, [user, auth]);

  if (!user || !auth) {
    return <Loading />;
  }

  const isMe = user.uid === auth.user.uid;

  const handleFollowUser = async () => {
    try {
      setIsLoadingFollowing(true);
      await useFollowUser(auth.user.uid, user.uid);
      setIsFollowing(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingFollowing(false);
    }
  };

  const handleUnfollowUser = async () => {
    try {
      setIsLoadingFollowing(true);
      await useUnfollowUser(auth.user.uid, user.uid);
      setIsFollowing(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingFollowing(false);
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <Avatar user={user} followers={true} following={true} />
        {!isMe &&
          (isFollowing ? (
            <button onClick={handleUnfollowUser} className="following">
              Unfollow
              {isLoadingFollowing && <ArrowPathIcon />}
            </button>
          ) : (
            <button onClick={handleFollowUser}>
              Follow
              {isLoadingFollowing && <ArrowPathIcon />}
            </button>
          ))}
      </div>
      <div className="profile-content">
        <Posts uid={user.uid} />
      </div>
    </div>
  );
};

export default Profile;
