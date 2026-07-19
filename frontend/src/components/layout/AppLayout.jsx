import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";

import "./AppLayout.css";

const AppLayout = () => {
  const [collapsed, setCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  // Close mobile drawer when resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMobileOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  return (
    <div className="app-layout">

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`main-layout ${
          collapsed ? "collapsed" : ""
        }`}
      >
        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}
        />

        <main className="page-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AppLayout;