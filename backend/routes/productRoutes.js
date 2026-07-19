import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";
import { createProductController, getProductsController, getProductByIdController,
updateProductController, deleteProductController
 } from "../controllers/productController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorize("Admin", "Manager"),
  createProductController
);
router.get(
  "/",
  authMiddleware,
  authorize("Admin", "Manager"),
  getProductsController
);
router.get(
  "/:id",
  authMiddleware,
  authorize("Admin", "Manager"),
  getProductByIdController
);
router.put(
  "/:id",
  authMiddleware,
  authorize("Admin", "Manager"),
  updateProductController
);
router.delete(
  "/:id",
  authMiddleware,
  authorize("Admin"),
  deleteProductController
);


export default router;