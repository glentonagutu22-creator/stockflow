import asyncHandler from "../middleware/asyncHandler.js";
import * as saleService from "../services/saleService.js";
import saleSchema from "../validators/saleValidator.js";

const createSale = asyncHandler(async (req, res) => {
  const validatedData = saleSchema.parse(req.body);

  const sale = await saleService.createSale(validatedData, req.user.id);

  res.status(201).json({
    success: true,
    message: "Sale completed successfully.",
    data: sale,
  });
});

const getSales = asyncHandler(async (req, res) => {
  const sales = await saleService.getSales(req.query, req.user.id);

  res.status(200).json({
    success: true,
    data: sales,
  });
});

const getSaleById = asyncHandler(async (req, res) => {
  const sale = await saleService.getSaleById(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    data: sale,
  });
});

export {
  createSale,
  getSales,
  getSaleById,
};