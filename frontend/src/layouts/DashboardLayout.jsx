import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar/Sidebar";
import Header from "../components/layout/Header/Header";

import "./DashboardLayout.css";

const DashboardLayout = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const titles = {
    "/dashboard": "Dashboard",
    "/products": "Products",
    "/customers": "Customers",
    "/sales": "Sales",
    "/purchases": "Purchases",
    "/suppliers": "Suppliers",
    "/categories": "Categories",
    "/reports": "Reports",
    "/profile": "Profile",
    "/settings": "Settings",
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`dashboard-content ${
          collapsed ? "collapsed" : ""
        }`}
      >
        <Header
          title={titles[location.pathname] || "StockFlow"}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;