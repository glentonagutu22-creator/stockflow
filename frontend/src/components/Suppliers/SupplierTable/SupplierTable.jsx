import SupplierRow from "../SupplierRow/SupplierRow";
import "./SupplierTable.css";

const SupplierTable = ({
  suppliers,
  loading,
  onEdit,
  onDelete,
}) => {

  if (loading) {
    return (
      <p className="table-message">
        Loading suppliers...
      </p>
    );
  }

  if (!suppliers.length) {
    return (
      <p className="table-message">
        No suppliers found.
      </p>
    );
  }

  return (
    <div className="supplier-table-wrapper">

      <table className="supplier-table">

        <thead>

          <tr>
            <th>Code</th>
            <th>Business</th>
            <th>Contact Person</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {suppliers.map((supplier) => (
            <SupplierRow
              key={supplier._id}
              supplier={supplier}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default SupplierTable;