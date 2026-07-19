import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
import mongoose from "mongoose";

const getDashboardStats = async (userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  // Products
  const totalProducts = await Product.countDocuments({
    createdBy: userId,
  });

  const lowStock = await Product.countDocuments({
    createdBy: userId,
    quantity: { $lte: 5 },
  });

  // Today's date range
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Today's sales
  const todaysSales = await Sale.countDocuments({
    cashier: userId,
    createdAt: {
      $gte: today,
      $lt: tomorrow,
    },
  });
  const recentSales = await Sale.find({
  cashier: userId,
})
  .sort({ createdAt: -1 })
  .limit(5)
  .select(
    "saleNumber customerName totalAmount paymentMethod createdAt"
  );
  const lowStockProducts = await Product.find({
  createdBy: userId,
  quantity: { $lte: 5 },
})
  .sort({ quantity: 1 })
  .limit(5)
  .select("name sku quantity");

  // Today's revenue
  const todayRevenueResult = await Sale.aggregate([
    {
      $match: {
        cashier: userObjectId,
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  // Total revenue
  const totalRevenueResult = await Sale.aggregate([
    {
      $match: {
        cashier: userObjectId,
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  return {
    totalProducts,
    lowStock,
    todaysSales,
    todayRevenue: todayRevenueResult[0]?.total || 0,
    totalRevenue: totalRevenueResult[0]?.total || 0,
    recentSales,
    lowStockProducts,
  };
};
const getSalesChartData = async (userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setHours(0, 0, 0, 0);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const sales = await Sale.aggregate([
    {
      $match: {
        cashier: userObjectId,
        createdAt: {
          $gte: sevenDaysAgo,
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        revenue: {
          $sum: "$totalAmount",
        },
        sales: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.day": 1,
      },
    },
  ]);

  return sales;
};

export { getDashboardStats,
  getSalesChartData,
 };