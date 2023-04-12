import React from "react";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import FollowingFollowersList from "./FollowingFollowersList";
import FollowUnfollowButton from "./FollowUnfollowButton";
import { useAuthContext } from "../context/AuthProvider";
import AvatarStats from "./AvatarStats";
import { useState } from "react";
import { useFollowUser, useUnfollowUser } from "../hooks/users";

const Avatar = ({
  user,
  size = "medium",
  showUsername = true,
  stats = true,
  button = true,
}) => {
  const { auth } = useAuthContext();

  const [isFollowing, setIsFollowing] = useState(null);
  const [isLoadingFollowing, setIsLoadingFollowing] = useState(false);

  const handleFollowUser = async (cUser, oUser) => {
    try {
      setIsLoadingFollowing(true);
      await useFollowUser(cUser.uid, oUser.uid);
      setIsFollowing(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingFollowing(false);
    }
  };

  const handleUnfollowUser = async (cUser, oUser) => {
    try {
      setIsLoadingFollowing(true);
      await useUnfollowUser(cUser.uid, oUser.uid);
      setIsFollowing(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingFollowing(false);
    }
  };

  // !!!!!!!!!!!!
  // set a onSnapshot listener to make sure you always have the latest data of the "user" prop, maybe use the uid instead...

  return (
    <div className={`avatar avatar-${size}`}>
      {user.avatar && <img src={user.avatar} alt={user.username} />}
      {showUsername && (
        <div className="avatar-right">
          <NavLink to={`/profile/${user.username}`} className="avatar-username">
            {user.username}
          </NavLink>
          {stats && <AvatarStats user={user} />}
        </div>
      )}
      {button && (
        <FollowUnfollowButton
          currentUser={auth.user}
          otherUser={user}
          handleFollowUser={handleFollowUser}
          handleUnfollowUser={handleUnfollowUser}
          isLoadingFollowing={isLoadingFollowing}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
        />
      )}
    </div>
  );
};

export default Avatar;
