import "./DashboardSummary.css";

const DashboardSummary = ({ data }) => {
  const cards = [
    {
      title: "Products",
      value: data.totalProducts || 0,
    },
    {
      title: "Categories",
      value: data.totalCategories || 0,
    },
    {
      title: "Suppliers",
      value: data.totalSuppliers || 0,
    },
    {
      title: "Sales",
      value: `Ksh ${Number(data.totalSales || 0).toLocaleString()}`,
    },
    {
      title: "Purchases",
      value: `Ksh ${Number(data.totalPurchases || 0).toLocaleString()}`,
    },
    {
      title: "Inventory Value",
      value: `Ksh ${Number(data.inventoryValue || 0).toLocaleString()}`,
    },
    {
      title: "Low Stock",
      value: data.lowStockProducts || 0,
    },
  ];

  return (
    <div className="dashboard-summary">
      {cards.map((card) => (
        <div
          key={card.title}
          className="summary-card"
        >
          <h4>{card.title}</h4>

          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummary;