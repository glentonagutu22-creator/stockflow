import generateSequence from "./sequences/generateSequence.js";

const generateCustomerCode = () =>
  generateSequence("customer", "CUS", 4);

export default generateCustomerCode;