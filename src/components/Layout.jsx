import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { AuthProvider } from "../context/AuthProvider";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <AuthProvider>
      <>
        <Header />
        <main id="site-content">
          <div className="container">
            <div className="layout-cols">
              <Outlet />
              <Sidebar />
            </div>
          </div>
        </main>
      </>
      <ToastContainer
        autoClose={1000}
        hideProgressBar={true}
        position="top-left"
      />
    </AuthProvider>
  );
};

export default Layout;
