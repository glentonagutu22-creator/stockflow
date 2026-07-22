import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";
import Category from "../models/Category.js";
import Purchase from "../models/Purchase.js";
import Sale from "../models/Sale.js";

export const getDashboardSummary = async () => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    totalProducts,
    lowStockProducts,
    totalSales,
    todaySales,
  ] = await Promise.all([
    Product.countDocuments(),

    Product.countDocuments({
      $expr: {
        $lte: ["$quantity", "$minimumStock"],
      },
    }),

    Sale.find().select("totalAmount"),

    Sale.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    }).select("totalAmount"),
  ]);

  const totalRevenue = totalSales.reduce(
    (sum, sale) => sum + sale.totalAmount,
    0
  );

  const todayRevenue = todaySales.reduce(
    (sum, sale) => sum + sale.totalAmount,
    0
  );

  return {
    totalProducts,

    todaySales: todaySales.length,

    todayRevenue,

    totalRevenue,

    lowStockProducts,
  };
};
export const getInventoryReport = async () => {
  const products = await Product.find()
    .select(
      "sku name category quantity minimumStock buyingPrice sellingPrice inventoryValue status"
    )
    .sort({ name: 1 });

  return products.map((product) => ({
    sku: product.sku,
    name: product.name,
    category: product.category,
    quantity: product.quantity,
    minimumStock: product.minimumStock,
    buyingPrice: product.buyingPrice,
    sellingPrice: product.sellingPrice,
    inventoryValue: product.inventoryValue,
    status:
      product.quantity === 0
        ? "Out of Stock"
        : product.quantity <= product.minimumStock
        ? "Low Stock"
        : "In Stock",
  }));
};
export const getLowStockReport = async () => {
  return await Product.find({
    $expr: {
      $lte: ["$quantity", "$minimumStock"],
    },
  })
    .select(
      "sku name category quantity minimumStock buyingPrice sellingPrice inventoryValue"
    )
    .sort({ quantity: 1 });
};
export const getSalesReport = async () => {
  const sales = await Sale.find();

  let totalRevenue = 0;
  let totalProfit = 0;
  let totalItemsSold = 0;

  sales.forEach((sale) => {
    totalRevenue += Number(sale.totalAmount) || 0;

    sale.items.forEach((item) => {
      totalItemsSold += Number(item.quantity) || 0;

      const buyingPrice = Number(item.buyingPrice);
      const sellingPrice = Number(item.sellingPrice);
      const quantity = Number(item.quantity);

      // Log invalid sale items
      if (
        Number.isNaN(buyingPrice) ||
        Number.isNaN(sellingPrice) ||
        Number.isNaN(quantity)
      ) {
        console.log("Invalid sale item found:");
        console.log("Sale:", sale.saleNumber);
        console.log(item);
        return;
      }

      totalProfit += (sellingPrice - buyingPrice) * quantity;
    });
  });

  return {
    totalOrders: sales.length,
    totalRevenue,
    totalItemsSold,
    totalProfit,
  };
};
export const getPurchaseReport = async () => {
  const purchases = await Purchase.find({
    isDeleted: false,
  });

  let totalAmount = 0;
  let totalItems = 0;

  purchases.forEach((purchase) => {
    totalAmount += purchase.totalAmount;

    purchase.items.forEach((item) => {
      totalItems += item.quantity;
    });
  });

  return {
    totalPurchases: purchases.length,
    totalAmount,
    totalItems,
    averagePurchaseValue:
      purchases.length === 0
        ? 0
        : totalAmount / purchases.length,
  };
};
export const getCategoryReport = async () => {
  const report = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        totalProducts: { $sum: 1 },
        totalStock: { $sum: "$quantity" },
        inventoryValue: { $sum: "$inventoryValue" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalProducts: 1,
        totalStock: 1,
        inventoryValue: 1,
      },
    },
    {
      $sort: {
        category: 1,
      },
    },
  ]);

  return report;
};
export const getSupplierReport = async () => {
  const report = await Purchase.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$supplier",
        totalPurchases: { $sum: 1 },
        totalAmount: { $sum: "$totalAmount" },
      },
    },
    {
      $lookup: {
        from: "suppliers",
        localField: "_id",
        foreignField: "_id",
        as: "supplier",
      },
    },
    {
      $unwind: "$supplier",
    },
    {
      $project: {
        _id: 0,
        supplierId: "$supplier._id",
        supplierName: "$supplier.businessName",
        totalPurchases: 1,
        totalAmount: 1,
      },
    },
    {
      $sort: {
        totalAmount: -1,
      },
    },
  ]);

  return report;
};