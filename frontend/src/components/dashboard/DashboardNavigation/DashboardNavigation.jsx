import "./DashboardNavigation.css";
import { useNavigate } from "react-router-dom";

import {
  MdInventory2,
  MdPointOfSale,
  MdPeople,
  MdShoppingCart,
  MdLocalShipping,
  MdCategory,
  MdAssessment,
} from "react-icons/md";

const DashboardNavigation = () => {
  const navigate = useNavigate();

  const buttons = [
    {
      label: "Products",
      icon: <MdInventory2 />,
      path: "/products",
    },
    {
      label: "Sales",
      icon: <MdPointOfSale />,
      path: "/sales",
    },
    {
      label: "Customers",
      icon: <MdPeople />,
      path: "/customers",
    },
    {
      label: "Purchases",
      icon: <MdShoppingCart />,
      path: "/purchases",
    },
    {
      label: "Suppliers",
      icon: <MdLocalShipping />,
      path: "/suppliers",
    },
    {
      label: "Categories",
      icon: <MdCategory />,
      path: "/categories",
    },
    {
      label: "Reports",
      icon: <MdAssessment />,
      path: "/reports",
    },
  ];

  return (
    <div className="dashboard-navigation">
      {buttons.map((button) => (
        <button
          key={button.label}
          className="nav-button"
          onClick={() => navigate(button.path)}
        >
          <span className="nav-icon">
            {button.icon}
          </span>

          <span>{button.label}</span>
        </button>
      ))}
    </div>
  );
};

export default DashboardNavigation;