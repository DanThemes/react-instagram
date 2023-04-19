import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import Loading from "./Loading";

const Nav = () => {
  const {
    auth: { user, isLoading, error },
    logout,
  } = useAuthContext();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return error.message;
  }

  return (
    !isLoading && (
      <div>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink to="/search">Search User</NavLink>
              </li>
              <li>
                <NavLink to={`/profile/${user.username}`}>Profile</NavLink>
              </li>
              <li>
                <NavLink to="/update-profile">Update Profile</NavLink>
              </li>
              <li>
                <Link onClick={(e) => logout(e)}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Create account</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    )
  );
};

export default Nav;
