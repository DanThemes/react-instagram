import React from "react";
import { useUser } from "../hooks/users";

const Avatar = ({ uid, size = "medium" }) => {
  const { user, isLoading, error } = useUser(uid);

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return "Loading";
  }

  return (
    <div className={`avatar avatar-${size}`}>
      {user.avatar && <img src={user.avatar} alt={user.username} />}
      <span>{user.username}</span>
    </div>
  );
};

export default Avatar;
