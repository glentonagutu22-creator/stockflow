import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createCustomerController,
  getCustomersController,
  getCustomerController,
  updateCustomerController,
  deleteCustomerController,
} from "../controllers/customerController.js";

const router = express.Router();

// Protect all customer routes
router.use(authMiddleware);

// Customer Routes
router.post("/", createCustomerController);
router.get("/", getCustomersController);
router.get("/:id", getCustomerController);
router.put("/:id", updateCustomerController);
router.delete("/:id", deleteCustomerController);

export default router;