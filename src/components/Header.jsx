import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  return (
    <header id="site-header">
      <div id="site-header-content">
        <div className="container">
          <div className="logo-wrapper">
            <Link to="/">
              <h1>Insta</h1>
            </Link>
          </div>
          <div className="nav-wrapper">
            <Nav />
          </div>
        </div>
      </div>
      <div className="site-header-bg"></div>
    </header>
  );
};

export default Header;
