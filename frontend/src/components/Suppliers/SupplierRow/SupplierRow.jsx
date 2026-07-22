import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import "./SupplierRow.css";


const SupplierRow = ({
  supplier,
  onEdit,
  onDelete,
}) => {


const initials = supplier.businessName
  ?.split(" ")
  .map(word => word[0])
  .join("")
  .substring(0,2)
  .toUpperCase();



return (

<tr>


<td>

<div className="supplier-info">

<div className="supplier-avatar">

{initials}

</div>


<div>

<strong>
{supplier.businessName}
</strong>

<small>
{supplier.supplierCode}
</small>

</div>

</div>

</td>



<td>

{supplier.contactPerson || "-"}

</td>



<td>

{supplier.contact?.phone || "-"}

</td>



<td>

{supplier.contact?.email || "-"}

</td>



<td className="supplier-balance">

KSh {Number(
supplier.balance || 0
).toLocaleString()}

</td>



<td>

<span
className={
supplier.status === "active"
?
"status-active"
:
"status-inactive"
}
>

{supplier.status}

</span>

</td>



<td>


<div className="supplier-actions">


<button

className="supplier-edit-btn"

onClick={() =>
onEdit(supplier)
}

>

<FiEdit2/>

</button>



<button

className="supplier-delete-btn"

onClick={() =>
onDelete(supplier._id)
}

>

<FiTrash2/>

</button>


</div>


</td>



</tr>

);

};


export default SupplierRow;