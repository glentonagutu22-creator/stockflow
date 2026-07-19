import productSchema from "./productValidator.js";

const updateProductSchema = productSchema.partial();

export default updateProductSchema;