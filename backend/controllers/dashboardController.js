import asyncHandler from "../middleware/asyncHandler.js";
import { getDashboardStats,
    getSalesChartData,
 } from "../services/dashboardService.js";

const dashboardStats = asyncHandler(async (req, res) => {
  const stats = await getDashboardStats(req.user.id);

  res.status(200).json({
    success: true,
    message: "Dashboard statistics retrieved successfully.",
    data: stats,
  });
});
const salesChart = asyncHandler(async (req, res) => {
  const chartData = await getSalesChartData(req.user.id);

  res.status(200).json({
    success: true,
    message: "Sales chart retrieved successfully.",
    data: chartData,
  });
});

export { dashboardStats,salesChart, };