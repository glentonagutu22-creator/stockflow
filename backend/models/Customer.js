import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customerCode: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      trim: true,
      uppercase: true,
    },

    name: {
      first: {
        type: String,
        required: true,
        trim: true,
      },
      last: {
        type: String,
        trim: true,
        default: "",
      },
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
        default: "",
      },
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

    stats: {
      totalSpent: {
        type: Number,
        default: 0,
        min: 0,
      },

      totalOrders: {
        type: Number,
        default: 0,
        min: 0,
      },

      loyaltyPoints: {
        type: Number,
        default: 0,
        min: 0,
      },

      lastPurchase: {
        type: Date,
      },
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

customerSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`.trim();
});

customerSchema.set("toJSON", { virtuals: true });
customerSchema.set("toObject", { virtuals: true });

// Phone should be unique
customerSchema.index(
  { "contact.phone": 1 },
  { unique: true }
);

// Email should be unique only if provided
customerSchema.index(
  { "contact.email": 1 },
  {
    unique: true,
    sparse: true,
  }
);

// Text search
customerSchema.index({
  "name.first": "text",
  "name.last": "text",
});

export default mongoose.model("Customer", customerSchema);