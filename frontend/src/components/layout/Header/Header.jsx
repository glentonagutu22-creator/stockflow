import {
  FiBell,
  FiSearch,
  FiLogOut,
} from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Header.css";

 const Header = ({
  title,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) =>  {
  const { user, logout } = useAuth();

const navigate = useNavigate();

  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
    const handleLogout = () => {
  logout();
  navigate("/login", { replace: true });
};

  return (
    <header className="header">
      <div className="header-left">

  <button
    className="menu-btn"
    onClick={() => {
      if (window.innerWidth <= 900) {
        setMobileOpen(!mobileOpen);
      } else {
        setCollapsed(!collapsed);
      }
    }}
  >
    <FiMenu />
  </button>

  <div>
    <h2>{title}</h2>
    <p>Welcome back, {user?.name}</p>
  </div>

</div>

      <div className="header-actions">
        <button className="icon-btn">
          <FiSearch />
        </button>

        <button className="icon-btn">
          <FiBell />
        </button>
        <button
  className="logout-btn"
  onClick={handleLogout}
>
  <FiLogOut />
  Logout
</button>

        <div className="header-user">
          <div className="header-avatar">
            {initials}
          </div>

          <div>
            <strong>{user?.name}</strong>
            <small>{user?.role}</small>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;