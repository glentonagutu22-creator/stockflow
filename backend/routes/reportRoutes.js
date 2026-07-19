import express from "express";

import {
  getDashboardSummary,
  getInventoryReport,
  getLowStockReport,
  getSalesReport,
  getPurchaseReport,
  getCategoryReport,
  getSupplierReport,
} from "../controllers/reportController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/dashboard", getDashboardSummary);

router.get("/inventory", getInventoryReport);

router.get("/low-stock", getLowStockReport);

router.get("/sales", getSalesReport);

router.get("/purchases", getPurchaseReport);

router.get("/categories", getCategoryReport);

router.get("/suppliers", getSupplierReport);

export default router;