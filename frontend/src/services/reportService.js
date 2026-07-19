import api from "./api";

export const getDashboardSummary = async () => {
  const response = await api.get("/reports/dashboard");
  return response.data.data;
};

export const getInventoryReport = async () => {
  const response = await api.get("/reports/inventory");
  return response.data.data;
};

export const getLowStockReport = async () => {
  const response = await api.get("/reports/low-stock");
  return response.data.data;
};

export const getSalesReport = async () => {
  const response = await api.get("/reports/sales");
  return response.data.data;
};

export const getPurchaseReport = async () => {
  const response = await api.get("/reports/purchases");
  return response.data.data;
};

export const getCategoryReport = async () => {
  const response = await api.get("/reports/categories");
  return response.data.data;
};

export const getSupplierReport = async () => {
  const response = await api.get("/reports/suppliers");
  return response.data.data;
};