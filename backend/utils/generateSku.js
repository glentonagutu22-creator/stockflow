import generateSequence from "./sequences/generateSequence.js";

const generateSku = () =>
  generateSequence("productSku", "SKU", 6);

export default generateSku;