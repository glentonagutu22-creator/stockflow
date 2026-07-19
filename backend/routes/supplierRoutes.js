import express from "express";
import {
  createSupplierController,
  getSuppliersController,
  getSupplierByIdController,
  updateSupplierController,
  deleteSupplierController,
} from "../controllers/supplierController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";
const router = express.Router();


router
  .route("/")
  .post(authMiddleware, authorize("Admin", "Manager"),  createSupplierController)
  .get(authMiddleware, authorize("Admin", "Manager"),  getSuppliersController);

router
  .route("/:id")
  .get(authMiddleware, authorize("Admin", "Manager"),  getSupplierByIdController)
  .put(authMiddleware, authorize("Admin", "Manager"),  updateSupplierController)
  .delete(authMiddleware, authorize("Admin", "Manager"),  deleteSupplierController);

export default router;