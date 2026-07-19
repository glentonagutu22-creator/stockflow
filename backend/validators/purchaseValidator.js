import { z } from "zod";

const purchaseSchema = z.object({
  supplier: z.string().min(1, "Supplier is required."),

  items: z
    .array(
      z.object({
        product: z.string().min(1, "Product is required."),

        quantity: z.coerce
          .number()
          .positive("Quantity must be greater than zero."),

        buyingPrice: z.coerce
          .number()
          .min(0, "Buying price cannot be negative."),
      })
    )
    .min(1, "At least one item is required."),

  discount: z.coerce
    .number()
    .min(0, "Discount cannot be negative.")
    .optional(),

  tax: z.coerce
    .number()
    .min(0, "Tax cannot be negative.")
    .optional(),

  purchaseDate: z.coerce.date().optional(),

  status: z
    .enum(["Pending", "Received", "Cancelled"])
    .optional(),

  notes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters.")
    .optional(),
});

export default purchaseSchema;