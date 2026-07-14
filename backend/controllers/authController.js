import { registerUser } from "../services/authService.js";
import { registerSchema } from "../validators/authValidator.js";
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

export { register };