import asyncHandler from "../middleware/asyncHandler.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";
import productSchema from "../validators/productValidator.js";
import updateProductSchema from "../validators/updateProductSchema.js";

const createProductController = asyncHandler(async (req, res) => {
  const validatedData = productSchema.parse(req.body);

  const product = await createProduct(validatedData, req.user.id);

  res.status(201).json({
    success: true,
    message: "Product created successfully.",
    data: product,
  });
});

const getProductsController = asyncHandler(async (req, res) => {
  const { search, page, limit } = req.query;

  const data = await getProducts(
    {
      search,
      page,
      limit,
    },
    req.user.id
  );

  res.status(200).json({
    success: true,
    data,
  });
});

const getProductByIdController = asyncHandler(async (req, res) => {
  const product = await getProductById(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    data: product,
  });
});

const updateProductController = asyncHandler(async (req, res) => {
  const validatedData = updateProductSchema.parse(req.body);

  const product = await updateProduct(
    req.params.id,
    req.user.id,
    validatedData
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    data: product,
  });
});

const deleteProductController = asyncHandler(async (req, res) => {
  await deleteProduct(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
  });
});

export {
  createProductController,
  getProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};