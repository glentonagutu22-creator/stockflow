import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    buyingPrice: {
      type: Number,
      required: [true, "Buying price is required"],
      min: 0,
    },
    averageCost: {
  type: Number,
  default: 0,
  min: 0,
},

lastPurchasePrice: {
  type: Number,
  default: 0,
  min: 0,
},

inventoryValue: {
  type: Number,
  default: 0,
  min: 0,
},

    sellingPrice: {
      type: Number,
      required: [true, "Selling price is required"],
      min: 0,
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: 0,
      default: 0,
    },

    minimumStock: {
      type: Number,
      default: 5,
      min: 0,
    },

    unit: {
      type: String,
      required: [true, "Unit is required"],
      default: "Piece",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }

);

const Product = mongoose.model("Product", productSchema);

export default Product;