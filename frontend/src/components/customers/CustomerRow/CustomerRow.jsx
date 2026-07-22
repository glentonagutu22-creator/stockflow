import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import "./CustomerRow.css";

const CustomerRow = ({
  customer,
  onEdit,
  onDelete,
}) => {

  const initials =
    `${customer.name.first} ${customer.name.last}`
      .split(" ")
      .map((name)=>name[0])
      .join("")
      .toUpperCase();


  return (
    <tr>

      <td>

        <div className="customer-info">

          <div className="customer-avatar">
            {initials}
          </div>


          <div>

            <strong>
              {customer.name.first}{" "}
              {customer.name.last}
            </strong>

            <small>
              {customer.customerCode}
            </small>

          </div>

        </div>

      </td>



      <td>
        {customer.contact.phone}
      </td>



      <td>
        {customer.contact.email || "-"}
      </td>



      <td>
        {customer.stats?.totalOrders ?? 0}
      </td>



      <td className="money">

        KSh{" "}
        {(customer.stats?.totalSpent ?? 0)
          .toLocaleString()}

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

        <div className="customer-actions">


          <button
            className="customer-edit-btn"
            onClick={() =>
              onEdit(customer)
            }
          >

            <FiEdit2/>

          </button>



          <button
            className="customer-delete-btn"
            onClick={() =>
              onDelete(customer._id)
            }
          >

            <FiTrash2/>

          </button>


        </div>

      </td>


    </tr>
  );
};


export default CustomerRow;