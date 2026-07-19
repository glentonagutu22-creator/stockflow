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
    lowStock: 0,
    todaysSales: 0,
    todayRevenue: 0,
    totalRevenue: 0,
    recentSales: [],
    lowStockProducts: [],
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

        setStats(statsData);
        setChartData(salesChart);
      } catch (error) {
        console.error(
          "Failed to fetch dashboard data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard">

      {/* Header */}

      <div className="dashboard-header">

        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome back! Here's what's happening
            in your store today.
          </p>
        </div>

        <DashboardNavigation />

      </div>

      {/* Statistics */}

      <DashboardStats stats={stats} />

      {/* Main Content */}

      <div className="dashboard-content">

        {/* Left */}

        <div className="dashboard-main">

          <DashboardSalesChart
            data={chartData}
          />

          <DashboardRecentSales
            sales={stats.recentSales}
          />

        </div>

        {/* Right */}

        <div className="dashboard-side">

          <DashboardLowStock
            products={stats.lowStockProducts}
          />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;