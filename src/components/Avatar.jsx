import React from "react";
import { NavLink } from "react-router-dom";

const Avatar = ({ user, size = "medium", showUsername = true }) => {
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
