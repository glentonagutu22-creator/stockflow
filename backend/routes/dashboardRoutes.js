import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { dashboardValidator } from "../validators/dashboardValidator.js";
import { dashboardStats, salesChart } from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  dashboardValidator,
  dashboardStats
);
router.get("/sales-chart", authMiddleware, dashboardValidator, salesChart);
export default router;