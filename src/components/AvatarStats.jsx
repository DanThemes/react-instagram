import React from "react";
import UsersList from "./UsersList";
import Popup from "reactjs-popup";

const AvatarStats = ({ user, statsLink }) => {
  return (
    <p className="followers-following">
      {user.followers.length && statsLink ? (
        <Popup
          trigger={
            <span className="link">{user.followers.length} followers</span>
          }
          position="right center"
          modal
        >
          {(close) => <UsersList list={user.followers} close={close} />}
        </Popup>
      ) : (
        <span>{user.followers.length} followers</span>
      )}
      {user.following.length && statsLink ? (
        <Popup
          trigger={
            <span className="link">{user.following.length} following</span>
          }
          position="right center"
          modal
        >
          {(close) => <UsersList list={user.following} close={close} />}
        </Popup>
      ) : (
        <span>{user.following.length} following</span>
      )}
    </p>
  );
};

export default AvatarStats;
