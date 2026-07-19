import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: [
        "PURCHASE",
        "SALE",
        "PURCHASE_RETURN",
        "SALE_RETURN",
        "ADJUSTMENT",
        "OPENING_STOCK",
      ],
      required: true,
      index: true,
    },

    reference: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    referenceModel: {
      type: String,
      enum: [
        "Purchase",
        "Sale",
        "Adjustment",
      ],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    previousStock: {
      type: Number,
      required: true,
      min: 0,
    },

    newStock: {
      type: Number,
      required: true,
      min: 0,
    },

    unitCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    averageCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    inventoryValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

stockMovementSchema.index({
  product: 1,
  createdAt: -1,
});

stockMovementSchema.index({
  type: 1,
  createdAt: -1,
});

export default mongoose.model(
  "StockMovement",
  stockMovementSchema
);