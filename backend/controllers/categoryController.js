import asyncHandler from "../middleware/asyncHandler.js";

import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} from "../validators/categoryValidator.js";

import * as categoryService from "../services/categoryService.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { body } = validate(createCategorySchema, req);

  const category = await categoryService.createCategory(
    body,
    req.user.id
  );

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const result = await categoryService.getCategories(req.query);

  res.status(200).json({
    success: true,
    message: "Categories fetched successfully",
    data: result,
  });
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const { params } = validate(categoryIdSchema, req);

  const category = await categoryService.getCategoryById(params.id);

  res.status(200).json({
    success: true,
    message: "Category fetched successfully",
    data: category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { params } = validate(categoryIdSchema, req);
  const { body } = validate(updateCategorySchema, req);

  const category = await categoryService.updateCategory(
    params.id,
    body
  );

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { params } = validate(categoryIdSchema, req);

  await categoryService.deleteCategory(params.id);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});