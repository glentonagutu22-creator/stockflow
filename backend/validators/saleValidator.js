import { z } from "zod";

const saleSchema = z.object({
  items: z
    .array(
      z.object({
        product: z.string().min(1, "Product ID is required."),
        quantity: z.coerce
          .number()
          .int("Quantity must be a whole number.")
          .positive("Quantity must be greater than zero."),
      })
    )
    .min(1, "At least one product is required."),

  paymentMethod: z.enum(["Cash", "Mpesa", "Card"]),

  amountPaid: z.coerce
    .number()
    .min(0, "Amount paid cannot be negative.").optional(),
});

export default saleSchema;