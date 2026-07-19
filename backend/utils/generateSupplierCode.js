import generateSequence from "./sequences/generateSequence.js";

const generateSupplierCode = () =>
  generateSequence("supplier", "SUP", 4);

export default generateSupplierCode;