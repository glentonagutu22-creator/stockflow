import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateEmployeeId from "../utils/generateEmployeeId.js";
import generateToken from "../utils/generateToken.js";

const registerUser = async ({ name, email, phone, password }) => {
  // Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Generate employee ID
  const employeeId = await generateEmployeeId();

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Determine role
  const userCount = await User.countDocuments();

  const role = userCount === 0 ? "Admin" : "Cashier";

  // Create user
  const user = await User.create({
    employeeId,
    name,
    email,
    phone,
    password: hashedPassword,
    role,
  });

  // Generate token
  const token = generateToken(user._id, user.role);

  return {
    token,
    user: {
      id: user._id,
      employeeId: user.employeeId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};

export { registerUser };