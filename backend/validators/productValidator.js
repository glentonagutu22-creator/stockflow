import { coerce, z } from "zod";

const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters."),

  description: z.string().optional(),

  category: z
    .string()
    .min(2, "Category is required."),

  buyingPrice: z
    .coerce.number()
    .min(0, "Buying price cannot be negative."),

  sellingPrice: z
    .coerce.number()
    .min(0, "Selling price cannot be negative."),

  quantity: z
   .coerce.number()
    .min(0, "Quantity cannot be negative."),

  minimumStock: z
    .coerce.number()
    .min(0, "Minimum stock cannot be negative."),

  unit: z
    .string()
    .min(1, "Unit is required."),

  image: z.string().optional(),
});

export default productSchema;