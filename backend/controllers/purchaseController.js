import asyncHandler from "../middleware/asyncHandler.js";

import {
  createPurchase,
  getPurchases,
  getPurchaseById,
  deletePurchase,
  restorePurchase,
  getPurchaseStatistics,
} from "../services/purchaseService.js";

const createPurchaseController = asyncHandler(async (req, res) => {
     console.log("✅ Reached createPurchaseController");
    
  const purchase = await createPurchase(req.body, req.user.id);

  res.status(201).json({
    success: true,
    message: "Purchase created successfully.",
    data: purchase,
  });
});

const getPurchasesController = asyncHandler(async (req, res) => {
  const result = await getPurchases(req.query, req.user.id);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getPurchaseByIdController = asyncHandler(async (req, res) => {
  const purchase = await getPurchaseById(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    data: purchase,
  });
});

const deletePurchaseController = asyncHandler(async (req, res) => {
  const purchase = await deletePurchase(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Purchase deleted successfully.",
    data: purchase,
  });
});

const restorePurchaseController = asyncHandler(async (req, res) => {
  const purchase = await restorePurchase(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Purchase restored successfully.",
    data: purchase,
  });
});

const getPurchaseStatisticsController = asyncHandler(async (req, res) => {
  const statistics = await getPurchaseStatistics(req.user.id);

  res.status(200).json({
    success: true,
    data: statistics,
  });
});

export {
  createPurchaseController,
  getPurchasesController,
  getPurchaseByIdController,
  deletePurchaseController,
  restorePurchaseController,
  getPurchaseStatisticsController,
};