import React from "react";
import { NavLink } from "react-router-dom";
import FollowUnfollowButton from "./FollowUnfollowButton";
import { useAuthContext } from "../context/AuthProvider";
import AvatarStats from "./AvatarStats";
import { useState } from "react";
import { useFollowUser, useUnfollowUser, useUser } from "../hooks/users";
import Loading from "./Loading";

const Avatar = ({
  uid,
  avatarSize = "medium",
  avatarLink = true,
  showUsername = true,
  stats = true,
  statsLink = true,
  button = true,
  close,
}) => {
  const { auth } = useAuthContext();
  const { user } = useUser(uid);

  const [isFollowing, setIsFollowing] = useState(null);
  const [isLoadingFollowing, setIsLoadingFollowing] = useState(false);

  // useEffect(() => {

  // }, [user]);

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

  if (!auth || !user) {
    return <Loading />;
  }

  return (
    <div className={`avatar avatar-${avatarSize}`}>
      {user.avatar && <img src={user.avatar} alt={user.username} />}
      {showUsername && (
        <div className="avatar-right">
          {avatarLink ? (
            <NavLink
              to={`/profile/${user.username}`}
              className="avatar-username"
              onClick={close}
            >
              {user.username}
            </NavLink>
          ) : (
            <span className="avatar-username">{user.username}</span>
          )}
          {stats && <AvatarStats user={user} statsLink={statsLink} />}
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
