import express from "express";
import { createSale, getSaleById, getSales } from "../controllers/saleController.js";
import  authMiddleware  from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";


const router = express.Router();

router.post("/", authMiddleware, authorize("Admin", "Manager", "Cashier"), createSale);
router.get("/", authMiddleware, authorize("Admin", "Manager"), getSales);
router.get("/", authMiddleware,authorize("Admin", "Manager", "Cashier"), getSaleById);
export default router;