import React from "react";
import { Link, NavLink } from "react-router-dom";
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
  );
};

export default Nav;
