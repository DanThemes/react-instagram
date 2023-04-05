import React from "react";
import { useAuthContext } from "../context/AuthProvider";

const Avatar = () => {
  const {
    auth: { user },
  } = useAuthContext();

  {
    console.log(user);
  }
  return (
    <div>
      <img src={user.photoURL} alt={user.username} />
    </div>
  );
};

export default Avatar;
