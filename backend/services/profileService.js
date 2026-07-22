import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const updateProfile = async (userId, data, file) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.name = data.name ?? user.name;
  user.email = data.email ?? user.email;
  user.phone = data.phone ?? user.phone;

  if (file) {
    const uploaded = await uploadToCloudinary(
      file,
      "stockflow/profile-images"
    );

    user.profileImage = uploaded.secure_url;
  }

  await user.save();

  return user;
};