import mongoose from "mongoose";

import Purchase from "../models/Purchase.js";
import Supplier from "../models/Supplier.js";
import Product from "../models/Product.js";

import generatePurchaseNumber from "../utils/generatePurchaseNumber.js";

import AppError from "../utils/AppError.js";
import findDocument from "../utils/findDocument.js";
import getPagination from "../utils/pagination.js";
import buildSearchQuery from "../utils/buildSearchQuery.js";

import { updateInventory } from "./inventory/index.js";

const createPurchase = async (purchaseData, userId) => {
  console.log("===== CREATE PURCHASE START =====");
  console.log(purchaseData);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log("1");

    const {
      supplier,
      items,
      discount = 0,
      tax = 0,
      purchaseDate,
      status,
      notes,
    } = purchaseData;

    console.log("2");

    const supplierDoc = await Supplier.findOne({
      _id: supplier,
      createdBy: userId,
    }).session(session);

    console.log("3", supplierDoc?.businessName);

    if (!supplierDoc) {
      throw new AppError("Supplier not found.", 404);
    }

    let subtotal = 0;
    const purchaseItems = [];

    for (const item of items) {
      console.log("4", item);

      const product = await Product.findOne({
        _id: item.product,
        createdBy: userId,
      }).session(session);

      console.log("5", product?.name);

      if (!product) {
        throw new AppError("Product not found.", 404);
      }

      const itemSubtotal = item.quantity * item.buyingPrice;

      subtotal += itemSubtotal;

      purchaseItems.push({
        product: product._id,
        quantity: item.quantity,
        buyingPrice: item.buyingPrice,
        subtotal: itemSubtotal,
      });
    }

    console.log("6");

    const totalAmount = subtotal - discount + tax;

    const purchaseNumber = await generatePurchaseNumber();

    console.log("7", purchaseNumber);

    const purchase = await Purchase.create(
      [{
        purchaseNumber,
        supplier,
        items: purchaseItems,
        subtotal,
        discount,
        tax,
        totalAmount,
        purchaseDate,
        status,
        notes,
        createdBy: userId,
      }],
      { session }
    );

    console.log("8");

    const purchaseDoc = purchase[0];

    for (const item of purchaseItems) {
      console.log("9");

      await updateInventory({
        session,
        product: item.product,
        quantity: item.quantity,
        unitCost: item.buyingPrice,
        type: "PURCHASE",
        reference: purchaseDoc._id,
        referenceModel: "Purchase",
        createdBy: userId,
      });
    }

    console.log("10");

    supplierDoc.balance += totalAmount;

    await supplierDoc.save({ session });

    console.log("11");

    await session.commitTransaction();

    console.log("12");

    session.endSession();

    return purchaseDoc;

  } catch (error) {
    console.error("PURCHASE ERROR:");
    console.error(error);

    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};
const getPurchases = async (
  { search = "", page = 1, limit = 10 },
  userId
) => {
  const query = buildSearchQuery(
    search,
    ["purchaseNumber", "status", "notes"],
    {
      createdBy: userId,
      isDeleted: false,
    }
  );

  const {
    page: currentPage,
    limit: perPage,
    skip,
  } = getPagination(page, limit);

  const purchases = await Purchase.find(query)
    .populate("supplier", "businessName supplierCode")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(perPage);

  const total = await Purchase.countDocuments(query);

  return {
    purchases,
    page: currentPage,
    pages: Math.ceil(total / perPage),
    total,
  };
};

const getPurchaseById = async (purchaseId, userId) => {
  return await Purchase.findOne({
    _id: purchaseId,
    createdBy: userId,
    isDeleted: false,
  })
    .populate("supplier")
    .populate("items.product");
};

const deletePurchase = async (purchaseId, userId) => {
  const purchase = await findDocument(
    Purchase,
    {
      _id: purchaseId,
      createdBy: userId,
      isDeleted: false,
    },
    "Purchase not found."
  );

  purchase.isDeleted = true;
  purchase.deletedAt = new Date();

  await purchase.save();

  return purchase;
};

const restorePurchase = async (purchaseId, userId) => {
  const purchase = await Purchase.findOne({
    _id: purchaseId,
    createdBy: userId,
    isDeleted: true,
  });

  if (!purchase) {
    throw new AppError(
      "Purchase not found.",
      404
    );
  }

  purchase.isDeleted = false;
  purchase.deletedAt = null;

  await purchase.save();

  return purchase;
};

const getPurchaseStatistics = async (userId) => {
  const purchases = await Purchase.find({
    createdBy: userId,
    isDeleted: false,
  });

  const totalPurchases = purchases.length;

  const totalAmount = purchases.reduce(
    (sum, purchase) => sum + purchase.totalAmount,
    0
  );

  const totalItems = purchases.reduce(
    (sum, purchase) => sum + purchase.items.length,
    0
  );

  return {
    totalPurchases,
    totalItems,
    totalAmount,
  };
};


export {
  createPurchase,
  getPurchases,
  getPurchaseById,
  deletePurchase,
  restorePurchase,
  getPurchaseStatistics,
};