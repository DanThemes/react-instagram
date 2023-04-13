import React from "react";
import { useUsers } from "../hooks/users";
import Loading from "./Loading";
import Avatar from "./Avatar";

const UsersList = ({ list, close }) => {
  const { users } = useUsers(list);

  if (!users) {
    return <Loading />;
  }

  {
    console.log(users);
  }

  return (
    <div className="users-list">
      {users.map((user) => (
        <div key={user.uid} className="users-list-item">
          <Avatar
            uid={user.uid}
            statsLink={false}
            avatarSize="small"
            close={close}
          />
        </div>
      ))}
    </div>
  );
};

export default UsersList;
