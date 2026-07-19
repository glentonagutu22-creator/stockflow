import express from "express";

import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.use(authMiddleware);

router
  .route("/")
  .post(authorize("Admin"), createCategory)
  .get(getCategories);

router
  .route("/:id")
  .get(getCategoryById)
  .put(authorize("Admin"), updateCategory)
  .delete(authorize("Admin"), deleteCategory);

export default router;