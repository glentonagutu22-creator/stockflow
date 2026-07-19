import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateEmployeeId from "../utils/generateEmployeeId.js";
import generateToken from "../utils/generateToken.js";
import AppError from "../utils/AppError.js";



const registerUser = async ({ name, email, phone, password }) => {
  // Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(
  "Email already exists",
  409
);
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


const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isActive) {
    throw new AppError(
      "Your account has been deactivated. Please contact your administrator.",
      403
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id, user.role);

  return {
    token,
    user: {
      id: user._id,
      employeeId: user.employeeId,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
export { registerUser, loginUser };