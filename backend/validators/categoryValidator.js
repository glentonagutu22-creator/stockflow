import { z } from "zod";

export const createCategorySchema = z.object({
  
    name: z
      .string()
      .trim()
      .min(2, "Category name must be at least 2 characters")
      .max(50, "Category name cannot exceed 50 characters"),

    description: z
      .string()
      .trim()
      .max(255, "Description cannot exceed 255 characters")
      .optional()
      .or(z.literal("")),

    status: z
      .enum(["Active", "Inactive"])
      .optional(),
  
});

export const updateCategorySchema = z.object({
  
    name: z
      .string()
      .trim()
      .min(2)
      .max(50)
      .optional(),

    description: z
      .string()
      .trim()
      .max(255)
      .optional(),

    status: z
      .enum(["Active", "Inactive"])
      .optional(),
  
});

export const categoryIdSchema = z.object({
  params: z.object({
    id: z.string().length(24, "Invalid category ID"),
  }),
});