import express from "express";
import {
  getReceiptSettings,
  updateReceiptSettings,
} from "../controllers/receiptSettingsController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getReceiptSettings);
router.put("/", authMiddleware, updateReceiptSettings);

export default router;