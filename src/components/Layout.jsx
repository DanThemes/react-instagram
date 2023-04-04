import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <Header />
      <main id="site-content">
        <div className="container">
          <div className="layout-cols">
            <Outlet />
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
