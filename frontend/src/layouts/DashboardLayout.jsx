import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import Header from "../components/layout/Header/Header";

const DashboardLayout = () => {
  const location = useLocation();

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
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Header title={titles[location.pathname] || "StockFlow"} />

        <main
          style={{
            flex: 1,
            padding: "20px",
            background: "var(--bg)",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;