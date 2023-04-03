import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/auth";

const Nav = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {user ? (
          <>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink onClick={(e) => logout(e)}>Logout</NavLink>
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
  );
};

export default Nav;
