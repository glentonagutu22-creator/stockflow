import generateSequence from "./sequences/generateSequence.js";

const generateEmployeeId = () =>
  generateSequence("employeeId", "SF", 4);

export default generateEmployeeId;