import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";

import {
  createPurchaseController,
  getPurchasesController,
  getPurchaseByIdController,
  deletePurchaseController,
  restorePurchaseController,
  getPurchaseStatisticsController,
} from "../controllers/purchaseController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/statistics", getPurchaseStatisticsController);

router.patch("/:id/restore", restorePurchaseController);

router.post(
  "/", 
  
  createPurchaseController
);

router.get("/", getPurchasesController);

router.get("/:id", getPurchaseByIdController);

router.delete("/:id", deletePurchaseController);

export default router;