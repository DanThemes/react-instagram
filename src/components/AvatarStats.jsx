import React from "react";
import FollowingFollowersList from "./FollowingFollowersList";
import Popup from "reactjs-popup";

const AvatarStats = ({ user, statsLink }) => {
  return (
    <p className="followers-following">
      {user.followers.length && statsLink ? (
        <Popup
          trigger={
            <span className="not-empty">{user.followers.length} followers</span>
          }
          position="right center"
          modal
        >
          <FollowingFollowersList currentUser={user} list={user.followers} />
        </Popup>
      ) : (
        <span>{user.followers.length} followers</span>
      )}
      {user.following.length && statsLink ? (
        <Popup
          trigger={
            <span className="not-empty">{user.following.length} following</span>
          }
          position="right center"
          modal
        >
          <FollowingFollowersList currentUser={user} list={user.following} />
        </Popup>
      ) : (
        <span>{user.following.length} following</span>
      )}
    </p>
  );
};

export default AvatarStats;
