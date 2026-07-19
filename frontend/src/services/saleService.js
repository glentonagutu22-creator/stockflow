import api from "./api";

export const createSale = async (saleData) => {
  const response = await api.post("/sales", saleData);
  return response.data;
};

export const getSales = async ({
  search = "",
  page = 1,
  limit = 10,
} = {}) => {
  const response = await api.get("/sales", {
    params: {
      search,
      page,
      limit,
    },
  });

  return response.data;
};