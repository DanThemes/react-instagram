import React from "react";
import { useFollowUser, useUnfollowUser, useUsers } from "../hooks/users";
import Loading from "./Loading";
import Avatar from "./Avatar";
import FollowUnfollowButton from "./FollowUnfollowButton";
import { useState } from "react";

const FollowingFollowersList = ({ currentUser, list }) => {
  const { users } = useUsers(list);

  if (!users) {
    return <Loading />;
  }

  {
    console.log(users);
  }

  return (
    <div className="users-list">
      {users.map((user) => (
        <div key={user.uid} className="users-list-item">
          <Avatar user={user} />
          <div className="users-list-follow-unfollow">
            <FollowUnfollowButton
              currentUser={currentUser}
              otherUser={user}
              handleFollowUser={handleFollowUser}
              handleUnfollowUser={handleUnfollowUser}
              isLoadingFollowing={isLoadingFollowing}
              isFollowing={isFollowing}
              setIsFollowing={setIsFollowing}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowingFollowersList;
