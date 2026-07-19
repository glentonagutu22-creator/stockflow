import express from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";
import ROLES from "../constants/roles.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.get(
  "/admin",
  authMiddleware,
  authorize(ROLES.ADMIN),
  (req, res) => {
    res.json({
      success: true,
      message: `Welcome ${req.user.name}, you are an Admin.`,
    });
  }
);

export default router;