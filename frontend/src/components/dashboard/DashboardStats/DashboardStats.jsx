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
      icon: <MdInventory2 />,
      color: "blue",
    },
    {
      title: "Today's Sales",
      value: stats.todaysSales ?? 0,
      icon: <MdPointOfSale />,
      color: "green",
    },
    {
      title: "Today's Revenue",
      value: `KSh ${Number(
        stats.todayRevenue ?? 0
      ).toLocaleString()}`,
      icon: <MdPayments />,
      color: "purple",
    },
    {
      title: "Total Revenue",
      value: `KSh ${Number(
        stats.totalRevenue ?? 0
      ).toLocaleString()}`,
      icon: <MdTrendingUp />,
      color: "orange",
    },
    {
      title: "Low Stock",
      value: stats.lowStock ?? 0,
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
          <div
            className={`stat-icon ${card.color}`}
          >
            {card.icon}
          </div>

          <div className="stat-content">
            <p>{card.title}</p>
            <h2>{card.value}</h2>
          </div>
        </div>
      ))}
    </section>
  );
};

export default DashboardStats;