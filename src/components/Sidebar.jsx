import React from "react";
import Avatar from "./Avatar";
import { useAuthContext } from "../context/AuthProvider";
import Loading from "./Loading";

const Sidebar = () => {
  const {
    auth: { user },
  } = useAuthContext();

  if (!user) {
    return <Loading />;
  }

  return (
    <aside className="sidebar">
      <h4>{user.displayName}</h4>
      <p>{user.bio}</p>
      <Avatar uid={user.uid} />
    </aside>
  );
};

export default Sidebar;
