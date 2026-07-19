import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const createCategory = async (data, userId) => {
  const exists = await Category.findOne({
    name: new RegExp(`^${data.name}$`, "i"),
  });

  if (exists) {
    throw new Error("Category already exists");
  }

  return await Category.create({
    ...data,
    createdBy: userId,
  });
};

export const getCategories = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
}) => {
  const filter = {};

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;

  const [categories, total] = await Promise.all([
    Category.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Category.countDocuments(filter),
  ]);

  return {
    categories,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const updateCategory = async (id, data) => {
  if (data.name) {
    const exists = await Category.findOne({
      _id: { $ne: id },
      name: new RegExp(`^${data.name}$`, "i"),
    });

    if (exists) {
      throw new Error("Category already exists");
    }
  }

  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  const products = await Product.countDocuments({
    category: category.name,
  });

  if (products > 0) {
    throw new Error(
      "Cannot delete category because it is assigned to products"
    );
  }

  await category.deleteOne();

  return null;
};