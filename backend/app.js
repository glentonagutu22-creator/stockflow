import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to StockFlow API 🚀",
  });
});

// Routes
app.use("/api/auth", authRoutes);

// Error middleware (must be last)
app.use(errorMiddleware);

export default app;