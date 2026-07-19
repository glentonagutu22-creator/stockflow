import Product from "../models/Product.js";
import generateSku from "../utils/generateSku.js";
import getPagination from "../utils/pagination.js";
import AppError from "../utils/AppError.js";
import findDocument from "../utils/findDocument.js";
import buildSearchQuery from "../utils/buildSearchQuery.js";

const createProduct = async (productData, userId) => {
  const {
    name,
    description,
    category,
    buyingPrice,
    sellingPrice,
    quantity,
    minimumStock,
    unit,
    image,
  } = productData;

  if (sellingPrice < buyingPrice) {
    throw new AppError(
      "Selling price cannot be less than buying price.",
      400
    );
  }

  const sku = await generateSku();

  const averageCost = buyingPrice;
  const lastPurchasePrice = buyingPrice;
  const inventoryValue = buyingPrice * quantity;

  const product = await Product.create({
    sku,
    name,
    description,
    category,
    buyingPrice,
    averageCost,
    lastPurchasePrice,
    inventoryValue,
    sellingPrice,
    quantity,
    minimumStock,
    unit,
    image,
    createdBy: userId,
  });

  return product;
};
const getProducts = async ({ search = "", page = 1, limit = 10 }, userId) => {
 const query = buildSearchQuery(
  search,
  ["name", "sku", "category"],
  {
    createdBy: userId,
  }
);

  const {
    page: currentPage,
    limit: perPage,
    skip,
  } = getPagination(page, limit);

  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(perPage);

  const total = await Product.countDocuments(query);

  return {
    products,
    page: currentPage,
    pages: Math.ceil(total / perPage),
    total,
  };
};

const getProductById = async (productId, userId) => {
  return await findDocument(
    Product,
    {
      _id: productId,
      createdBy: userId,
    },
    "Product not found."
  );
};

const updateProduct = async (productId, userId, productData) => {
  const product = await findDocument(
    Product,
    {
      _id: productId,
      createdBy: userId,
    },
    "Product not found."
  );

  const buyingPrice = Number(
    productData.buyingPrice ?? product.buyingPrice
  );

  const sellingPrice = Number(
    productData.sellingPrice ?? product.sellingPrice
  );

  if (sellingPrice < buyingPrice) {
    throw new AppError(
      "Selling price cannot be less than buying price.",
      400
    );
  }

  Object.assign(product, productData);

  // Keep inventory values in sync when buying price or quantity changes
  if (
    productData.buyingPrice !== undefined ||
    productData.quantity !== undefined
  ) {
    product.averageCost = product.buyingPrice;
    product.lastPurchasePrice = product.buyingPrice;
    product.inventoryValue =
      product.quantity * product.averageCost;
  }

  await product.save();

  return product;
};

const deleteProduct = async (productId, userId) => {
  const product = await findDocument(
    Product,
    {
      _id: productId,
      createdBy: userId,
    },
    "Product not found."
  );

  await product.deleteOne();

  return product;
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};