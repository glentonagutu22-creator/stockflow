import api from "./api";

export const getReceiptSettings = async () => {
  const response = await api.get("/settings/receipt");
  return response.data;
};

export const updateReceiptSettings = async (data) => {
  const response = await api.put("/settings/receipt", data);
  return response.data;
};