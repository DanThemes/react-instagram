import React from "react";
import { useUser } from "../hooks/users";
import { NavLink } from "react-router-dom";

const Avatar = ({ uid, size = "medium", showUsername = true }) => {
  const { user, isLoading, error } = useUser(uid);

  if (!user) {
    return;
  }

  // if (isLoading) {
  //   return "Loading";
  // }

  // if (error) {
  //   return "Loading";
  // }

  return (
    <div className={`avatar avatar-${size}`}>
      {user.avatar && <img src={user.avatar} alt={user.username} />}
      {showUsername && (
        <span>
          <NavLink to={`/profile/${user.username}`}>{user.username}</NavLink>
        </span>
      )}
    </div>
  );
};

export default Avatar;
