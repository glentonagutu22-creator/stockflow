import generateSequence from "./sequences/generateSequence.js";

const generateSaleNumber = () =>
  generateSequence("saleNumber", "INV", 6);

export default generateSaleNumber;