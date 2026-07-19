import api from "./api";

// Get all purchases
export const getPurchases = async (params = {}) => {
  const response = await api.get("/purchases", { params });
  return response.data;
};

// Get purchase by ID
export const getPurchase = async (id) => {
  const response = await api.get(`/purchases/${id}`);
  return response.data;
};

// Create purchase
export const createPurchase = async (purchaseData) => {
  const response = await api.post("/purchases", purchaseData);
  return response.data;
};

// Update purchase
export const updatePurchase = async (id, purchaseData) => {
  const response = await api.put(`/purchases/${id}`, purchaseData);
  return response.data;
};

// Delete purchase
export const deletePurchase = async (id) => {
  const response = await api.delete(`/purchases/${id}`);
  return response.data;
};