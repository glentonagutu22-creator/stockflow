import asyncHandler from "../middleware/asyncHandler.js";
import * as profileService from "../services/profileService.js";

export const getProfileController = asyncHandler(async (req, res) => {
  const profile = await profileService.getProfile(req.user.id);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

export const updateProfileController = asyncHandler(async (req, res) => {
  const profile = await profileService.updateProfile(
    req.user.id,
    req.body,
    req.file
  );

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: profile,
  });
});