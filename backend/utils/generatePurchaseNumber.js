import generateSequence from "./sequences/generateSequence.js";

const generatePurchaseNumber = () =>
  generateSequence("purchaseNumber", "PO", 6);

export default generatePurchaseNumber;