import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard");
  return response.data.data;
};
export const getSalesChartData = async () => {
  const response = await api.get("/dashboard/sales-chart");
  return response.data.data;
};