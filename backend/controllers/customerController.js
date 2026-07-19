import asyncHandler from "../middleware/asyncHandler.js";
import AppError from "../utils/AppError.js";

import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../services/customerService.js";

import { validateCustomer } from "../validators/customerValidator.js";

/**
 * @desc    Create Customer
 * @route   POST /api/customers
 * @access  Private
 */
export const createCustomerController = asyncHandler(async (req, res) => {
  const { isValid, errors } = validateCustomer(req.body);

  if (!isValid) {
    throw new AppError(errors.join(", "), 400);
  }
  console.log(req.user);


  const customer = await createCustomer(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Customer created successfully.",
    data: customer,
  });
});

/**
 * @desc    Get All Customers
 * @route   GET /api/customers
 * @access  Private
 */
export const getCustomersController = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status = "active",
  } = req.query;

  const result = await getCustomers({
    page: Number(page),
    limit: Number(limit),
    search,
    status,
  });

  res.status(200).json({
    success: true,
    message: "Customers retrieved successfully.",
    ...result,
  });
});

/**
 * @desc    Get Customer By ID
 * @route   GET /api/customers/:id
 * @access  Private
 */
export const getCustomerController = asyncHandler(async (req, res) => {
  const customer = await getCustomerById(req.params.id);

  res.status(200).json({
    success: true,
    data: customer,
  });
});

/**
 * @desc    Update Customer
 * @route   PUT /api/customers/:id
 * @access  Private
 */
export const updateCustomerController = asyncHandler(async (req, res) => {
  const { isValid, errors } = validateCustomer(req.body);

  if (!isValid) {
    throw new AppError(errors.join(", "), 400);
  }

  const customer = await updateCustomer(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Customer updated successfully.",
    data: customer,
  });
});

/**
 * @desc    Soft Delete Customer
 * @route   DELETE /api/customers/:id
 * @access  Private
 */
export const deleteCustomerController = asyncHandler(async (req, res) => {
  await deleteCustomer(req.params.id);

  res.status(200).json({
    success: true,
    message: "Customer deleted successfully.",
  });
});