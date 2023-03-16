import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const user = false;

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
              <NavLink to="/logout">Logout</NavLink>
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
