import "./DashboardStats.css";

import {
  MdInventory2,
  MdPointOfSale,
  MdPayments,
  MdTrendingUp,
  MdWarningAmber,
} from "react-icons/md";

const DashboardStats = ({ stats = {} }) => {
  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts ?? 0,
      subtitle: "Products in inventory",
      icon: <MdInventory2 />,
      color: "blue",
    },
    {
      title: "Today's Sales",
      value: stats.todaySales ?? stats.todaysSales ?? 0,
      subtitle: "Orders completed today",
      icon: <MdPointOfSale />,
      color: "green",
    },
    {
      title: "Today's Revenue",
      value: `KSh ${Number(
        stats.todayRevenue ?? 0
      ).toLocaleString()}`,
      subtitle: "Revenue generated today",
      icon: <MdPayments />,
      color: "purple",
    },
    {
      title: "Total Revenue",
      value: `KSh ${Number(
        stats.totalRevenue ?? 0
      ).toLocaleString()}`,
      subtitle: "All-time sales revenue",
      icon: <MdTrendingUp />,
      color: "orange",
    },
    {
      title: "Low Stock",
      value: stats.lowStockProducts ?? stats.lowStock ?? 0,
      subtitle: "Items needing restock",
      icon: <MdWarningAmber />,
      color: "red",
    },
  ];

  return (
    <section className="dashboard-stats">
      {cards.map((card) => (
        <div
          key={card.title}
          className="dashboard-stat-card"
        >
          <div className="stat-top">
            <div className={`stat-icon ${card.color}`}>
              {card.icon}
            </div>

            <span className="stat-badge">
              Live
            </span>
          </div>

          <div className="stat-content">
            <p className="stat-title">{card.title}</p>

            <h2>{card.value}</h2>

            <span className="stat-subtitle">
              {card.subtitle}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default DashboardStats;