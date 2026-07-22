import "./Navbar.css";

import {
  MdMenu,
  MdSearch,
  MdNotificationsNone,
  MdKeyboardArrowDown,
} from "react-icons/md";

import { useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/products": "Products",
  "/categories": "Categories",
  "/suppliers": "Suppliers",
  "/purchases": "Purchases",
  "/customers": "Customers",
  "/sales": "Sales",
  "/reports": "Reports",
  "/settings": "Settings",
  "/profile": "Profile",
};

const Navbar = ({
  collapsed,
  setCollapsed,
  setMobileOpen,
}) => {
  const location = useLocation();

  const title =
    pageTitles[location.pathname] || "StockFlow";

  return (
    <header className="navbar">

      {/* LEFT */}

      <div className="navbar-left">

        <button
          className="menu-btn"
          onClick={() => {
            if (window.innerWidth <= 900) {
              setMobileOpen(true);
            } else {
              setCollapsed(!collapsed);
            }
          }}
        >
          <MdMenu />
        </button>

        <div>

          <h2>{title}</h2>

          <span>
            Welcome back to StockFlow
          </span>

        </div>

      </div>

      {/* CENTER */}

      <div className="navbar-search">

        <MdSearch />

        <input
          type="text"
          placeholder="Search products, customers..."
        />

      </div>

      {/* RIGHT */}

      <div className="navbar-right">

        <button className="notification-btn">

          <MdNotificationsNone />

          <span className="notification-dot"></span>

        </button>

        <div className="user-profile">

          <div className="user-avatar">
            G
          </div>

          <div className="user-info">

            <strong>Glenton</strong>

            <small>Administrator</small>

          </div>

          <MdKeyboardArrowDown />

        </div>

      </div>

    </header>
  );
};

export default Navbar;