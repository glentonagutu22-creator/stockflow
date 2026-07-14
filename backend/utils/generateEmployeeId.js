import Counter from "../models/Counter.js";

const generateEmployeeId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "employeeId" },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true }
  );

  return `SF-${counter.sequence.toString().padStart(4, "0")}`;
};

export default generateEmployeeId;