import asyncHandler from "../middleware/asyncHandler.js";
import * as reportService from "../services/reportService.js";

export const getDashboardSummary = asyncHandler(async (req, res) => {
  const report = await reportService.getDashboardSummary();

  res.status(200).json({
    success: true,
    message: "Dashboard summary fetched successfully",
    data: report,
  });
});

export const getInventoryReport = asyncHandler(async (req, res) => {
  const report = await reportService.getInventoryReport();

  res.status(200).json({
    success: true,
    message: "Inventory report fetched successfully",
    data: report,
  });
});

export const getLowStockReport = asyncHandler(async (req, res) => {
  const report = await reportService.getLowStockReport();

  res.status(200).json({
    success: true,
    message: "Low stock report fetched successfully",
    data: report,
  });
});

export const getSalesReport = asyncHandler(async (req, res) => {
  const report = await reportService.getSalesReport();

  res.status(200).json({
    success: true,
    message: "Sales report fetched successfully",
    data: report,
  });
});

export const getPurchaseReport = asyncHandler(async (req, res) => {
  const report = await reportService.getPurchaseReport();

  res.status(200).json({
    success: true,
    message: "Purchase report fetched successfully",
    data: report,
  });
});

export const getCategoryReport = asyncHandler(async (req, res) => {
  const report = await reportService.getCategoryReport();

  res.status(200).json({
    success: true,
    message: "Category report fetched successfully",
    data: report,
  });
});

export const getSupplierReport = asyncHandler(async (req, res) => {
  const report = await reportService.getSupplierReport();

  res.status(200).json({
    success: true,
    message: "Supplier report fetched successfully",
    data: report,
  });
});