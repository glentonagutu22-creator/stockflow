const CustomerRow = ({
  customer,
  onEdit,
  onDelete,
}) => {
  return (
    <tr>

      <td>
        <strong>
          {customer.name.first} {customer.name.last}
        </strong>
        <br />
        <small>{customer.customerCode}</small>
      </td>

      <td>{customer.contact.phone}</td>

      <td>
        {customer.contact.email || "-"}
      </td>

      <td>
        {customer.stats?.totalOrders ?? 0}
      </td>

      <td>
        KSh{" "}
        {(customer.stats?.totalSpent ?? 0).toLocaleString()}
      </td>

      <td>
        <span
          className={
            customer.status === "active"
              ? "status-active"
              : "status-inactive"
          }
        >
          {customer.status}
        </span>
      </td>

      <td>

        <button
          className="edit-btn"
          onClick={() => onEdit(customer)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(customer._id)}
        >
          Delete
        </button>

      </td>

    </tr>
  );
};

export default CustomerRow;