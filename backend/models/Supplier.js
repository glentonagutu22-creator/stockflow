import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    supplierCode: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      trim: true,
      uppercase: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    contactPerson: {
      type: String,
      trim: true,
      default: "",
    },

    contact: {
      phone: {
        type: String,
        required: true,
        trim: true,
      },

      alternativePhone: {
        type: String,
        trim: true,
        default: "",
      },

      email: {
        type: String,
        trim: true,
        lowercase: true,
        default: undefined,
      },
    },

    kraPin: {
      type: String,
      trim: true,
      uppercase: true,
      default: "",
    },

    address: {
      county: {
        type: String,
        trim: true,
        default: "",
      },

      town: {
        type: String,
        trim: true,
        default: "",
      },

      street: {
        type: String,
        trim: true,
        default: "",
      },

      postalCode: {
        type: String,
        trim: true,
        default: "",
      },
    },

    balance: {
      type: Number,
      default: 0,
      min: 0,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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

supplierSchema.index(
  { "contact.phone": 1 },
  { unique: true }
);

supplierSchema.index(
  { "contact.email": 1 },
  {
    unique: true,
    sparse: true,
  }
);

supplierSchema.index({
  businessName: "text",
  contactPerson: "text",
});

export default mongoose.model("Supplier", supplierSchema);