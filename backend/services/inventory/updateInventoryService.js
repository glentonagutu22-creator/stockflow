import Product from "../../models/Product.js";
import StockMovement from "../../models/StockMovement.js";

const updateInventory = async ({
  session,

  product,

  quantity,

  unitCost,

  type,

  reference,

  referenceModel,

  createdBy,

  notes = "",
}) => {
  const existingProduct = await Product.findById(product).session(session);

  if (!existingProduct) {
    throw new Error("Product not found.");
  }

  const previousStock = existingProduct.quantity;

  let newStock;

  switch (type) {
    case "PURCHASE":
    case "SALE_RETURN":
    case "OPENING_STOCK":
      newStock = previousStock + quantity;
      break;

    case "SALE":
    case "PURCHASE_RETURN":
    case "ADJUSTMENT":
      newStock = previousStock - quantity;

      if (newStock < 0) {
        throw new Error(
          `${existingProduct.name} has insufficient stock.`
        );
      }

      break;

    default:
      throw new Error("Invalid inventory transaction.");
  }

  let averageCost =
  existingProduct.averageCost > 0
    ? existingProduct.averageCost
    : existingProduct.buyingPrice;

  if (
  type === "PURCHASE" ||
  type === "OPENING_STOCK"
) {
  const previousAverageCost =
    existingProduct.averageCost > 0
      ? existingProduct.averageCost
      : existingProduct.buyingPrice;

  const previousValue =
    previousStock * previousAverageCost;

  const purchasedValue =
    quantity * unitCost;

  averageCost =
    (previousValue + purchasedValue) /
    newStock;

  existingProduct.lastPurchasePrice = unitCost;

  existingProduct.buyingPrice = unitCost;
}

  const inventoryValue =
    averageCost * newStock;

  existingProduct.quantity = newStock;

  existingProduct.averageCost =
    Number(averageCost.toFixed(2));

  existingProduct.inventoryValue =
    Number(inventoryValue.toFixed(2));

  await existingProduct.save({
    session,
  });

  await StockMovement.create(
    [
      {
        product,

        type,

        reference,

        referenceModel,

        quantity,

        previousStock,

        newStock,

        unitCost,

        averageCost:
          existingProduct.averageCost,

        inventoryValue:
          existingProduct.inventoryValue,

        notes,

        createdBy,
      },
    ],
    {
      session,
    }
  );

  return existingProduct;
};

export default updateInventory;