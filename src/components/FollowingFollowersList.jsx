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
          <Avatar uid={user.uid} statsLink={false} />
        </div>
      ))}
    </div>
  );
};

export default FollowingFollowersList;
