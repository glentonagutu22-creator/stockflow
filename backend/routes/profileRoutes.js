import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  getProfileController,
  updateProfileController,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/", authMiddleware, getProfileController);

router.put(
  "/",
  authMiddleware,
  upload.single("profileImage"),
  updateProfileController
);

export default router;