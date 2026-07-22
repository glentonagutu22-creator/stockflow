import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getSalesChartData,
} from "../../services/dashboardService";

import DashboardNavigation from "../../components/dashboard/DashboardNavigation/DashboardNavigation";
import DashboardStats from "../../components/dashboard/DashboardStats/DashboardStats";
import DashboardSalesChart from "../../components/dashboard/DashboardSalesChart/DashboardSalesChart";
import DashboardRecentSales from "../../components/dashboard/DashboardRecentSales/DashboardRecentSales";
import DashboardLowStock from "../../components/dashboard/DashboardLowStock/DashboardLowStock";

import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    todaySales: 0,
    todayRevenue: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    recentSales: [],
    lowStockProductsList: [],
  });

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, salesChart] = await Promise.all([
          getDashboardStats(),
          getSalesChartData(),
        ]);

        setStats({
          ...statsData,
          lowStockProductsList:
            statsData.lowStockProducts || [],
        });

        setChartData(salesChart);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>

          <span className="dashboard-badge">
            StockFlow Analytics
          </span>

          <h1>Dashboard</h1>

          <p>
            Monitor sales, inventory and business
            performance in real time.
          </p>

        </div>

        <DashboardNavigation />

      </div>

      <DashboardStats stats={stats} />

      <div className="dashboard-content">

  <DashboardSalesChart
    data={chartData}
  />

  <DashboardRecentSales
    sales={stats.recentSales}
  />

  <DashboardLowStock
    products={stats.lowStockProductsList}
  />

</div>

    </div>
  );
};

export default Dashboard;