import Customer from "../models/Customer.js";
import generateCustomerCode from "../utils/generateCustomerCode.js";
import AppError from "../utils/AppError.js";

/**
 * Create Customer
 */
export const createCustomer = async (customerData, userId) => {
     console.log("User ID:", userId);

  // Check duplicate phone
  const existingPhone = await Customer.findOne({
    "contact.phone": customerData.contact.phone,
  });

  if (existingPhone) {
    throw new AppError("Phone number already exists.", 409);
  }

  // Check duplicate email
  if (customerData.contact?.email) {
    const existingEmail = await Customer.findOne({
      "contact.email": customerData.contact.email,
    });

    if (existingEmail) {
      throw new AppError("Email address already exists.", 409);
    }
  }

  const customerCode = await generateCustomerCode();

  const customer = await Customer.create({
    customerCode,
    ...customerData,
    createdBy: userId,
  });

  return customer;
};

/**
 * Get All Customers
 */
export const getCustomers = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "active",
}) => {
  const query = {};

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { customerCode: { $regex: search, $options: "i" } },
      { "name.first": { $regex: search, $options: "i" } },
      { "name.last": { $regex: search, $options: "i" } },
      { "contact.phone": { $regex: search, $options: "i" } },
      { "contact.email": { $regex: search, $options: "i" } },
    ];
  }

  const customers = await Customer.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Customer.countDocuments(query);

  return {
    customers,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get Customer By ID
 */
export const getCustomerById = async (id) => {
  const customer = await Customer.findById(id);

  if (!customer) {
    throw new AppError("Customer not found.", 404);
  }

  return customer;
};

/**
 * Update Customer
 */
export const updateCustomer = async (id, customerData) => {
  const customer = await Customer.findById(id);

  if (!customer) {
    throw new AppError("Customer not found.", 404);
  }

  // Check duplicate phone
  if (
    customerData.contact?.phone &&
    customerData.contact.phone !== customer.contact.phone
  ) {
    const existingPhone = await Customer.findOne({
      "contact.phone": customerData.contact.phone,
      _id: { $ne: id },
    });

    if (existingPhone) {
      throw new AppError("Phone number already exists.", 409);
    }

    customer.contact.phone = customerData.contact.phone;
  }

  // Check duplicate email
  if (
    customerData.contact?.email &&
    customerData.contact.email !== customer.contact.email
  ) {
    const existingEmail = await Customer.findOne({
      "contact.email": customerData.contact.email,
      _id: { $ne: id },
    });

    if (existingEmail) {
      throw new AppError("Email address already exists.", 409);
    }

    customer.contact.email = customerData.contact.email;
  }

  // Update Name
  if (customerData.name) {
    if (customerData.name.first !== undefined) {
      customer.name.first = customerData.name.first.trim();
    }

    if (customerData.name.last !== undefined) {
      customer.name.last = customerData.name.last.trim();
    }
  }

  // Update Contact
  if (customerData.contact?.alternativePhone !== undefined) {
    customer.contact.alternativePhone =
      customerData.contact.alternativePhone.trim();
  }

  // Update Address
  if (customerData.address) {
    if (customerData.address.county !== undefined)
      customer.address.county = customerData.address.county.trim();

    if (customerData.address.town !== undefined)
      customer.address.town = customerData.address.town.trim();

    if (customerData.address.street !== undefined)
      customer.address.street = customerData.address.street.trim();

    if (customerData.address.postalCode !== undefined)
      customer.address.postalCode =
        customerData.address.postalCode.trim();
  }

  // Notes
  if (customerData.notes !== undefined) {
    customer.notes = customerData.notes.trim();
  }

  // Status
  if (customerData.status !== undefined) {
    customer.status = customerData.status;
  }

  await customer.save();

  return customer;
};

/**
 * Soft Delete Customer
 */
export const deleteCustomer = async (id) => {
  const customer = await Customer.findById(id);

  if (!customer) {
    throw new AppError("Customer not found.", 404);
  }

  customer.status = "inactive";

  await customer.save();

  return customer;
};