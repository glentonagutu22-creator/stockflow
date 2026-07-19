import "./Sidebar.css";
import { NavLink } from "react-router-dom";

import {
  MdDashboard,
  MdInventory2,
  MdCategory,
  MdPeople,
  MdPointOfSale,
  MdAssessment,
  MdSettings,
  MdLogout,
} from "react-icons/md";

import {
  FaTruckLoading,
  FaBoxOpen,
} from "react-icons/fa";

const menu = [
  {
    title: "MAIN",
    items: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
    ],
  },

  {
    title: "INVENTORY",
    items: [
      {
        name: "Products",
        path: "/products",
        icon: <MdInventory2 />,
      },
      {
        name: "Categories",
        path: "/categories",
        icon: <MdCategory />,
      },
      {
        name: "Suppliers",
        path: "/suppliers",
        icon: <FaTruckLoading />,
      },
      {
        name: "Purchases",
        path: "/purchases",
        icon: <MdInventory2 />,
      },
    ],
  },

  {
    title: "SALES",
    items: [
      {
        name: "Customers",
        path: "/customers",
        icon: <MdPeople />,
      },
      {
        name: "Sales",
        path: "/sales",
        icon: <MdPointOfSale />,
      },
    ],
  },

  {
    title: "ANALYTICS",
    items: [
      {
        name: "Reports",
        path: "/reports",
        icon: <MdAssessment />,
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        name: "Settings",
        path: "/settings",
        icon: <MdSettings />,
      },
    ],
  },
];

const Sidebar = ({
  collapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      <aside
        className={`sidebar
        ${collapsed ? "collapsed" : ""}
        ${mobileOpen ? "open" : ""}`}
      >
        <div className="sidebar-top">

          <div className="sidebar-logo">

            <div className="logo-icon">
              <FaBoxOpen />
            </div>

            {!collapsed && (
              <div>
                <h2>StockFlow</h2>
                <span>
                  POS & Inventory
                </span>
              </div>
            )}

          </div>

          {menu.map((section) => (
            <div
              key={section.title}
              className="menu-section"
            >
              {!collapsed && (
                <h4>{section.title}</h4>
              )}

              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "menu-item active"
                      : "menu-item"
                  }
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  <span className="menu-icon">
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <span>{item.name}</span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">

          <button className="logout-btn">
            <MdLogout />

            {!collapsed && (
              <span>Logout</span>
            )}

          </button>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;