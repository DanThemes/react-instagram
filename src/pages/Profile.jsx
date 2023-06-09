import React from "react";
import Posts from "../components/Posts";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/users";
import { useAuthContext } from "../context/AuthProvider";
import Loading from "../components/Loading";
import Avatar from "../components/Avatar";

const Profile = () => {
  const { username } = useParams();

  const { user } = useUser(username);
  const { auth } = useAuthContext();

  if (!user || !auth) {
    return <Loading />;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <Avatar
          uid={user.uid}
          followers={true}
          following={true}
          avatarLink={false}
        />
      </div>
      <div className="profile-content">
        <Posts style="grid" uid={user.uid} />
      </div>
    </div>
  );
};

export default Profile;
