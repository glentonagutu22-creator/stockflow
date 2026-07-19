import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../services/supplierService.js";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  createSupplierSchema,
  updateSupplierSchema,
} from "../validators/supplierValidator.js";

const createSupplierController = asyncHandler(async (req, res) => {
  const validatedData = createSupplierSchema.parse(req.body);

  const supplier = await createSupplier(validatedData, req.user.id);

  res.status(201).json({
    success: true,
    message: "Supplier created successfully.",
    data: supplier,
  });
});

const getSuppliersController = asyncHandler(async (req, res) => {
  const suppliers = await getSuppliers(req.query, req.user.id);

  res.status(200).json({
    success: true,
    data: suppliers,
  });
});

const getSupplierByIdController = asyncHandler(async (req, res) => {
  const supplier = await getSupplierById(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    data: supplier,
  });
});

const updateSupplierController = asyncHandler(async (req, res) => {
  const validatedData = updateSupplierSchema.parse(req.body);

  const supplier = await updateSupplier(
    req.params.id,
    validatedData,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Supplier updated successfully.",
    data: supplier,
  });
});

const deleteSupplierController = asyncHandler(async (req, res) => {
  await deleteSupplier(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    message: "Supplier deleted successfully.",
  });
});

export {
  createSupplierController,
  getSuppliersController,
  getSupplierByIdController,
  updateSupplierController,
  deleteSupplierController,
};