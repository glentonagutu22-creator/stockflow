import { useEffect, useState } from "react";

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../services/supplierService";

import SupplierToolbar from "../../components/Suppliers/SupplierToolbar/SupplierToolbar";
import SupplierTable from "../../components/Suppliers/SupplierTable/SupplierTable";
import SupplierForm from "../../components/Suppliers/SupplierForm/SupplierForm";

import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/common/Modal/Modal";

import { toast } from "react-toastify";

import "./Suppliers.css";


const Suppliers = () => {


const [suppliers,setSuppliers] = useState([]);

const [loading,setLoading] = useState(false);

const [search,setSearch] = useState("");

const [page,setPage] = useState(1);


const [pagination,setPagination] = useState({
page:1,
pages:1,
total:0,
limit:10,
});


const [showModal,setShowModal] = useState(false);

const [editingSupplier,setEditingSupplier] =
useState(null);




const fetchSuppliers = async()=>{

try{

setLoading(true);


const response = await getSuppliers({
page,
search,
});


setSuppliers(response.data.suppliers);


setPagination({

page:response.data.page,

pages:response.data.pages,

total:response.data.total,

});



}catch(error){

console.error(error);

toast.error(
"Failed to load suppliers."
);


}finally{

setLoading(false);

}

};




useEffect(()=>{

fetchSuppliers();

},[page,search]);





const handleCreate = async(data)=>{

try{

await createSupplier(data);


toast.success(
"Supplier created successfully."
);


setShowModal(false);

fetchSuppliers();


}catch(error){

toast.error(
"Failed creating supplier."
);

}

};





const handleUpdate = async(data)=>{

try{

await updateSupplier(
editingSupplier._id,
data
);


toast.success(
"Supplier updated successfully."
);


setEditingSupplier(null);

setShowModal(false);

fetchSuppliers();


}catch(error){

toast.error(
"Failed updating supplier."
);

}

};





const handleDelete = async(id)=>{


if(
!window.confirm(
"Delete this supplier?"
)

) return;



try{


await deleteSupplier(id);


toast.success(
"Supplier deleted successfully."
);


fetchSuppliers();



}catch(error){

toast.error(
"Failed deleting supplier."
);

}


};
const openCreateModal = () => {
  setEditingSupplier(null);
  setShowModal(true);
};


const openEditModal = (supplier) => {
  setEditingSupplier(supplier);
  setShowModal(true);
};




return (
  <div className="suppliers-page">

    <div className="page-header">
      <h1>Suppliers</h1>
      <p>
        Manage your suppliers and supplier information.
      </p>
    </div>


    <div className="suppliers-card">

      <SupplierToolbar
        search={search}
        setSearch={setSearch}
        onAdd={openCreateModal}
      />


      <SupplierTable
        suppliers={suppliers}
        loading={loading}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />


      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.pages}
        onPageChange={setPage}
      />

    </div>


    <Modal
      isOpen={showModal}
      onClose={() =>
        setShowModal(false)
      }
    >
      <SupplierForm
        supplier={editingSupplier}
        onSubmit={
          editingSupplier
            ? handleUpdate
            : handleCreate
        }
      />
    </Modal>


  </div>
);


};


export default Suppliers;