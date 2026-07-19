import Supplier from "../models/Supplier.js";
import AppError from "../utils/AppError.js";
import generateSupplierCode from "../utils/generateSupplierCode.js";

const createSupplier = async (supplierData, userId) => {
    if (!supplierData.contact.email?.trim()) {
  supplierData.contact.email = undefined;
}
  const phoneExists = await Supplier.findOne({
    "contact.phone": supplierData.contact.phone,
  });

  if (phoneExists) {
    throw new AppError(
      "Supplier with this phone number already exists.",
      409
    );
  }

  if (supplierData.contact.email) {
    const emailExists = await Supplier.findOne({
      "contact.email": supplierData.contact.email.toLowerCase(),
    });

    if (emailExists) {
      throw new AppError(
        "Supplier with this email already exists.",
        409
      );
    }
  }

  const supplierCode = await generateSupplierCode();

  const supplier = await Supplier.create({
    supplierCode,
    ...supplierData,
    createdBy: userId,
  });

  return supplier;
};

const getSuppliers = async (
  { search = "", page = 1, limit = 10 },
  userId
) => {
  const query = {
    createdBy: userId,
  };

  if (search) {
    query.$or = [
      {
        supplierCode: {
          $regex: search,
          $options: "i",
        },
      },
      {
        businessName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        contactPerson: {
          $regex: search,
          $options: "i",
        },
      },
      {
        "contact.phone": {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const suppliers = await Supplier.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Supplier.countDocuments(query);

  return {
    suppliers,
    page: Number(page),
    pages: Math.ceil(total / limit),
    total,
  };
};

const getSupplierById = async (supplierId, userId) => {
  const supplier = await Supplier.findOne({
    _id: supplierId,
    createdBy: userId,
  });

  if (!supplier) {
    throw new AppError(
      "Supplier not found.",
      404
    );
  }

  return supplier;
};

const updateSupplier = async (
  supplierId,
  supplierData,
  userId
) => {
  const supplier = await Supplier.findOne({
    _id: supplierId,
    createdBy: userId,
  });

  if (!supplier) {
    throw new AppError(
      "Supplier not found.",
      404
    );
  }

  if (
    supplierData.contact?.phone &&
    supplierData.contact.phone !== supplier.contact.phone
  ) {
    const phoneExists = await Supplier.findOne({
      "contact.phone": supplierData.contact.phone,
      _id: { $ne: supplierId },
    });

    if (phoneExists) {
      throw new AppError(
        "Phone number already exists.",
        409
      );
    }
  }

  if (
    supplierData.contact?.email &&
    supplierData.contact.email !== supplier.contact.email
  ) {
    const emailExists = await Supplier.findOne({
      "contact.email": supplierData.contact.email.toLowerCase(),
      _id: { $ne: supplierId },
    });

    if (emailExists) {
      throw new AppError(
        "Email already exists.",
        409
      );
    }
  }

  Object.assign(supplier, supplierData);

  await supplier.save();

  return supplier;
};

const deleteSupplier = async (
  supplierId,
  userId
) => {
  const supplier = await Supplier.findOne({
    _id: supplierId,
    createdBy: userId,
  });

  if (!supplier) {
    throw new AppError(
      "Supplier not found.",
      404
    );
  }

  await supplier.deleteOne();

  return;
};

export {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};