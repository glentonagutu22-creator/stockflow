import {
  FaCashRegister,
  FaBoxOpen,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "./DashboardQuickActions.css";

const DashboardQuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "New Sale",
      icon: <FaCashRegister />,
      path: "/sales",
    },
    {
      title: "Products",
      icon: <FaBoxOpen />,
      path: "/products",
    },
    {
      title: "Sales History",
      icon: <FaClipboardList />,
      path: "/sales",
    },
    {
      title: "Reports",
      icon: <FaChartBar />,
      path: "/reports",
    },
  ];

  return (
    <div className="dashboard-actions">
      <h2>Quick Actions</h2>

      <div className="dashboard-actions-grid">
        {actions.map((action) => (
          <button
            key={action.title}
            className="dashboard-action-card"
            onClick={() => navigate(action.path)}
          >
            <div className="action-icon">
              {action.icon}
            </div>

            <span>{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardQuickActions;