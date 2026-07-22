import { useEffect, useState } from "react";
import "./CustomerForm.css";

const initialState = {
  name:{
    first:"",
    last:"",
  },

  contact:{
    phone:"",
    alternativePhone:"",
    email:"",
  },

  address:{
    county:"",
    town:"",
    street:"",
    postalCode:"",
  },

  notes:"",
  status:"active",
};


const CustomerForm = ({
  customer,
  onSubmit,
}) => {


const [formData,setFormData] =
useState(initialState);



useEffect(()=>{

if(customer){

setFormData({

name:{
first:customer.name?.first || "",
last:customer.name?.last || "",
},

contact:{
phone:customer.contact?.phone || "",
alternativePhone:
customer.contact?.alternativePhone || "",
email:
customer.contact?.email || "",
},

address:{
county:
customer.address?.county || "",
town:
customer.address?.town || "",
street:
customer.address?.street || "",
postalCode:
customer.address?.postalCode || "",
},

notes:
customer.notes || "",

status:
customer.status || "active",

});


}else{

setFormData(initialState);

}

},[customer]);




const handleChange=(section,field,value)=>{


if(section){

setFormData(prev=>({

...prev,

[section]:{

...prev[section],

[field]:value

}

}));

}else{


setFormData(prev=>({

...prev,

[field]:value

}));

}

};




const handleSubmit=(e)=>{

e.preventDefault();

onSubmit(formData);

};




return (

<form
className="customer-form"
onSubmit={handleSubmit}
>


<h2>

{customer
?"Edit Customer"
:"Add Customer"}

</h2>



<div className="customer-grid">


<input
placeholder="First Name"
value={formData.name.first}
onChange={(e)=>
handleChange(
"name",
"first",
e.target.value
)}
required
/>



<input
placeholder="Last Name"
value={formData.name.last}
onChange={(e)=>
handleChange(
"name",
"last",
e.target.value
)}
/>



<input
placeholder="Phone Number"
value={formData.contact.phone}
onChange={(e)=>
handleChange(
"contact",
"phone",
e.target.value
)}
required
/>



<input
placeholder="Alternative Phone"
value={formData.contact.alternativePhone}
onChange={(e)=>
handleChange(
"contact",
"alternativePhone",
e.target.value
)}
/>



<input
type="email"
placeholder="Email"
value={formData.contact.email}
onChange={(e)=>
handleChange(
"contact",
"email",
e.target.value
)}
/>



<input
placeholder="County"
value={formData.address.county}
onChange={(e)=>
handleChange(
"address",
"county",
e.target.value
)}
/>



<input
placeholder="Town"
value={formData.address.town}
onChange={(e)=>
handleChange(
"address",
"town",
e.target.value
)}
/>



<input
placeholder="Street"
value={formData.address.street}
onChange={(e)=>
handleChange(
"address",
"street",
e.target.value
)}
/>



<input
placeholder="Postal Code"
value={formData.address.postalCode}
onChange={(e)=>
handleChange(
"address",
"postalCode",
e.target.value
)}
/>



<select
value={formData.status}
onChange={(e)=>
handleChange(
null,
"status",
e.target.value
)}
>

<option value="active">
Active
</option>

<option value="inactive">
Inactive
</option>

</select>



</div>




<textarea
placeholder="Customer notes..."
value={formData.notes}
onChange={(e)=>
handleChange(
null,
"notes",
e.target.value
)}
/>



<button type="submit">

{customer
?"Update Customer"
:"Create Customer"}

</button>



</form>

);

};


export default CustomerForm;