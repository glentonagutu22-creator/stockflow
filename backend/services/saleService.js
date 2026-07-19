import mongoose from "mongoose";
import Sale from "../models/Sale.js";
import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";
import generateSaleNumber from "../utils/generateSaleNumber.js";

const createSale = async (saleData, userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      items,
      paymentMethod,
      amountPaid,
    } = saleData;

    if (!items || items.length === 0) {
      throw new AppError(
        "Please add at least one product.",
        400
      );
    }

    let totalAmount = 0;
    const saleItems = [];

    for (const item of items) {
      const product = await Product.findOne({
        _id: item.product,
        createdBy: userId,
      }).session(session);

      if (!product) {
        throw new AppError("Product not found.", 404);
      }

      if (item.quantity <= 0) {
        throw new AppError(
          "Quantity must be greater than zero.",
          400
        );
      }

      if (product.quantity < item.quantity) {
        throw new AppError(
          `${product.name} has only ${product.quantity} item(s) remaining.`,
          400
        );
      }

      const subtotal =
        product.sellingPrice * item.quantity;

      totalAmount += subtotal;

      saleItems.push({
        product: product._id,
        productName: product.name,
        sku: product.sku,
        buyingPrice: product.buyingPrice,
        sellingPrice: product.sellingPrice,
        quantity: item.quantity,
        price: product.sellingPrice,
        subtotal,
      });

      // Deduct stock
      product.quantity -= item.quantity;
      await product.save({ session });
    }

    // Handle payment
    let finalAmountPaid = Number(amountPaid);

    if (paymentMethod !== "Cash") {
      finalAmountPaid = totalAmount;
    }

    if (finalAmountPaid < totalAmount) {
      throw new AppError(
        "Amount paid cannot be less than the total amount.",
        400
      );
    }

    const change =
      paymentMethod === "Cash"
        ? finalAmountPaid - totalAmount
        : 0;

    const saleNumber = await generateSaleNumber();

    const [sale] = await Sale.create(
      [
        {
          saleNumber,
          items: saleItems,
          totalAmount,
          amountPaid: finalAmountPaid,
          change,
          paymentMethod,
          cashier: userId,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return sale;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getSales = async (
  { search = "", page = 1, limit = 10 },
  userId
) => {
  const query = {
    cashier: userId,
  };

  if (search) {
    query.saleNumber = {
      $regex: search,
      $options: "i",
    };
  }

  const skip = (page - 1) * limit;

  const sales = await Sale.find(query)
    .populate("cashier", "firstName lastName")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Sale.countDocuments(query);

  return {
    sales,
    page: Number(page),
    pages: Math.ceil(total / limit),
    total,
  };
};

const getSaleById = async (saleId, userId) => {
  const sale = await Sale.findOne({
    _id: saleId,
    cashier: userId,
  }).populate("cashier", "firstName lastName");

  if (!sale) {
    throw new AppError("Sale not found.", 404);
  }

  return sale;
};

export {
  createSale,
  getSales,
  getSaleById,
};