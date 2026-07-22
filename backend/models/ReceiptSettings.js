import mongoose from "mongoose";

const receiptSettingsSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: "",
      trim: true,
    },

    businessAddress: {
      type: String,
      default: "",
      trim: true,
    },

    businessPhone: {
      type: String,
      default: "",
      trim: true,
    },

    businessEmail: {
      type: String,
      default: "",
      trim: true,
    },

    logo: {
      type: String,
      default: "",
    },

    receiptHeader: {
      type: String,
      default: "",
      trim: true,
    },

    footerMessage: {
      type: String,
      default: "Thank you for shopping with us!",
      trim: true,
    },

    showLogo: {
      type: Boolean,
      default: true,
    },

    showAddress: {
      type: Boolean,
      default: true,
    },

    paperSize: {
      type: String,
      enum: ["58", "80"],
      default: "80",
    },
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
  unique: true,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ReceiptSettings", receiptSettingsSchema);