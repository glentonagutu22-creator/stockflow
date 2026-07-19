const SupplierRow = ({
  supplier,
  onEdit,
  onDelete,
}) => {
  return (
    <tr>

      <td>{supplier.supplierCode}</td>

      <td>{supplier.businessName}</td>

      <td>{supplier.contactPerson}</td>

      <td>{supplier.contact?.phone}</td>

      <td>{supplier.contact?.email || "-"}</td>

      <td>{supplier.balance}</td>

      <td>

        <span
          className={
            supplier.status === "active"
              ? "status active"
              : "status inactive"
          }
        >
          {supplier.status}
        </span>

      </td>

      <td>

        <button
          className="edit-btn"
          onClick={() => onEdit(supplier)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() =>
            onDelete(supplier._id)
          }
        >
          Delete
        </button>

      </td>

    </tr>
  );
};

export default SupplierRow;