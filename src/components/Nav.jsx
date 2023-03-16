import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const user = {};

  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        {user ? (
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Nav;
