import React from "react";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import UsersList from "./UsersList";

const Avatar = ({
  user,
  size = "medium",
  showUsername = true,
  followers = true,
  following = true,
}) => {
  return (
    <div className={`avatar avatar-${size}`}>
      {user.avatar && <img src={user.avatar} alt={user.username} />}
      {showUsername && (
        <div className="avatar-right">
          <NavLink to={`/profile/${user.username}`} className="avatar-username">
            {user.username}
          </NavLink>
          {(followers || following) && (
            <p className="followers-following">
              {followers &&
                (user.followers.length ? (
                  <Popup
                    trigger={
                      <span className="not-empty">
                        {user.followers.length} followers
                      </span>
                    }
                    position="right center"
                    modal
                  >
                    <UsersList uids={user.followers} />
                  </Popup>
                ) : (
                  <span>{user.followers.length} followers</span>
                ))}
              {following &&
                (user.following.length ? (
                  <Popup
                    trigger={
                      <span className="not-empty">
                        {user.following.length} following
                      </span>
                    }
                    position="right center"
                    modal
                  >
                    <UsersList uids={user.following} />
                  </Popup>
                ) : (
                  <span className="not-empty">
                    {user.following.length} following
                  </span>
                ))}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;
