import {
  FiBell,
  FiSearch,
  FiLogOut,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Header.css";

const Header = ({ title }) => {
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
      <div>
        <h2>{title}</h2>
        <p>Welcome back, {user?.name}</p>
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