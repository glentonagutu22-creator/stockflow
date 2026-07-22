import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/image",
  authMiddleware,
  upload.single("image"),
  
);

export default router;