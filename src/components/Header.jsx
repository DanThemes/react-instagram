import React from "react";
import Nav from "./Nav";

const Header = () => {
  return (
    <header id="site-header">
      <div className="container">
        <div className="logo-wrapper">
          <h1>logo</h1>
        </div>
        <div className="nav-wrapper">
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
