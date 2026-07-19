import AppError from "./AppError.js";

const findDocument = async (Model, query, message = "Document not found.") => {
  const document = await Model.findOne(query);

  if (!document) {
    throw new AppError(message, 404);
  }

  return document;
};

export default findDocument;