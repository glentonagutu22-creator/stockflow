import api from "./api";

// Get all suppliers
export const getSuppliers = async (params = {}) => {
  const response = await api.get("/suppliers", { params });
  return response.data;
};

// Get supplier by ID
export const getSupplier = async (id) => {
  const response = await api.get(`/suppliers/${id}`);
  return response.data;
};

// Create supplier
export const createSupplier = async (supplierData) => {
  const response = await api.post("/suppliers", supplierData);
  return response.data;
};

// Update supplier
export const updateSupplier = async (id, supplierData) => {
  const response = await api.put(`/suppliers/${id}`, supplierData);
  return response.data;
};

// Delete supplier
export const deleteSupplier = async (id) => {
  const response = await api.delete(`/suppliers/${id}`);
  return response.data;
};