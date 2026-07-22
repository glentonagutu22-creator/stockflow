import "./DashboardQuickActions.css";

import {
  MdPointOfSale,
  MdInventory2,
  MdShoppingCart,
  MdAssessment,
} from "react-icons/md";

import { useNavigate } from "react-router-dom";

const DashboardQuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "New Sale",
      subtitle: "Create a sales transaction",
      icon: <MdPointOfSale />,
      path: "/sales",
      color: "green",
    },
    {
      title: "Add Product",
      subtitle: "Register a new product",
      icon: <MdInventory2 />,
      path: "/products",
      color: "blue",
    },
    {
      title: "New Purchase",
      subtitle: "Record supplier purchase",
      icon: <MdShoppingCart />,
      path: "/purchases",
      color: "orange",
    },
    {
      title: "Reports",
      subtitle: "View business analytics",
      icon: <MdAssessment />,
      path: "/reports",
      color: "purple",
    },
  ];

  return (
    <section className="quick-actions">

      <div className="section-header">
        <h3>Quick Actions</h3>
        <p>Frequently used shortcuts</p>
      </div>

      <div className="quick-grid">

        {actions.map((action) => (
          <button
            key={action.title}
            className="quick-card"
            onClick={() => navigate(action.path)}
          >
            <div className={`quick-icon ${action.color}`}>
              {action.icon}
            </div>

            <div>
              <h4>{action.title}</h4>
              <p>{action.subtitle}</p>
            </div>
          </button>
        ))}

      </div>

    </section>
  );
};

export default DashboardQuickActions;