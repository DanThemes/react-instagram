import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const FollowUnfollowButton = ({
  currentUser,
  otherUser,
  handleFollowUser,
  handleUnfollowUser,
  isLoadingFollowing,
  isFollowing,
  setIsFollowing,
}) => {
  useEffect(() => {
    if (!currentUser || !otherUser) return;

    // setIsFollowing(currentUser.following.includes(otherUser.uid));
  }, [currentUser, otherUser]);

  const isMe = currentUser.uid === otherUser.uid;

  return (
    <>
      {!isMe &&
        (isFollowing ? (
          <button
            onClick={() => handleUnfollowUser(currentUser, otherUser)}
            className="following"
          >
            Unfollow
            {isLoadingFollowing && <ArrowPathIcon />}
          </button>
        ) : (
          <button onClick={() => handleFollowUser(currentUser, otherUser)}>
            Follow
            {isLoadingFollowing && <ArrowPathIcon />}
          </button>
        ))}
    </>
  );
};

export default FollowUnfollowButton;
