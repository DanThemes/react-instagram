import React from "react";
import { useUsers } from "../hooks/users";
import Loading from "./Loading";

const UsersList = ({ uids }) => {
  console.log(uids);
  const { users } = useUsers(uids);

  if (!users) {
    return <Loading />;
  }

  return <div>{console.log(users)}UsersList</div>;
};

export default UsersList;
