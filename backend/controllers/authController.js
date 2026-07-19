import { registerUser, loginUser } from "../services/authService.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import ApiResponse from "../utils/ApiResponse.js";

const register = async (req, res, next) => {
  try {
    // Validate request
    const validatedData = registerSchema.parse(req.body);

    // Register user
    const result = await registerUser(validatedData);

    return res.status(201).json(
      ApiResponse.success(
        "User registered successfully",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(validatedData);

    return res.status(200).json(
      ApiResponse.success(
        "Login successful",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};
const getProfile = async (req, res) => {
  return res.status(200).json(
    ApiResponse.success(
      "Profile retrieved successfully",
      req.user
    )
  );
};

export { register, login, getProfile };