import "./PurchaseTable.css";

const PurchaseTable = ({
  purchases,
  onEdit,
  onDelete,
}) => {
  if (!purchases.length) {
    return (
      <div className="purchase-table-empty">
        No purchases found.
      </div>
    );
  }

  const formatCurrency = (amount) =>
    Number(amount || 0).toLocaleString();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString();

  return (
    <div className="purchase-table-container">
      <table className="purchase-table">
        <thead>
          <tr>
            <th>Purchase No.</th>
            <th>Supplier</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th className="actions-column">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase._id}>
              <td>{purchase.purchaseNumber}</td>

              <td>
                {purchase.supplier?.businessName ||
                  purchase.supplier?.name ||
                  "-"}
              </td>

              <td>
                KSh {formatCurrency(purchase.totalAmount)}
              </td>

              <td>
                <span
                  className={`status-badge ${purchase.status?.toLowerCase()}`}
                >
                  {purchase.status}
                </span>
              </td>

              <td>
                {formatDate(
                  purchase.createdAt
                )}
              </td>

              <td className="actions">
                <button
                  className="edit-btn"
                  onClick={() => onEdit(purchase)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    onDelete(purchase._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTable;