import { z } from "zod";

export const createSupplierSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters.")
    .max(100, "Business name cannot exceed 100 characters."),

  contactPerson: z
    .string()
    .trim()
    .max(100, "Contact person cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  contact: z.object({
    phone: z
      .string()
      .trim()
      .min(10, "Phone number is required."),

    alternativePhone: z
      .string()
      .trim()
      .optional()
      .or(z.literal("")),

    email: z
      .string()
      .trim()
      .email("Invalid email address.")
      .optional()
      .or(z.literal("")),
  }),

  kraPin: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  address: z.object({
    county: z
      .string()
      .trim()
      .optional()
      .or(z.literal("")),

    town: z
      .string()
      .trim()
      .optional()
      .or(z.literal("")),

    street: z
      .string()
      .trim()
      .optional()
      .or(z.literal("")),

    postalCode: z
      .string()
      .trim()
      .optional()
      .or(z.literal("")),
  }),

  notes: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  status: z
    .enum(["active", "inactive"])
    .optional(),
});

export const updateSupplierSchema = createSupplierSchema.partial();