import CustomerRow from "../CustomerRow/CustomerRow";
import "./CustomerTable.css";

const CustomerTable = ({
  customers,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="customer-table-loading">
        Loading customers...
      </div>
    );
  }

  return (
    <div className="customer-table-container">
      <table className="customer-table">

        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Orders</th>
            <th>Total Spent</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {customers.length === 0 ? (
            <tr>
              <td colSpan="7" className="customer-empty">
                No customers found.
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <CustomerRow
                key={customer._id}
                customer={customer}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}

        </tbody>

      </table>
    </div>
  );
};

export default CustomerTable;