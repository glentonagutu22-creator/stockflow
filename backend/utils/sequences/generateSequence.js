import Counter from "../../models/Counter.js";

const generateSequence = async (name, prefix, length) => {
  const counter = await Counter.findOneAndUpdate(
    { name },
    {
      $inc: {
        sequence: 1,
      },
    },
    {
      upsert: true,
      returnDocument: "after",
    }
  );

  return `${prefix}-${String(counter.sequence).padStart(length, "0")}`;
};

export default generateSequence;