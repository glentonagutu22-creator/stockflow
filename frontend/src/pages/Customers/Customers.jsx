import { useEffect, useState } from "react";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/customerService";

import CustomerToolbar from "../../components/customers/CustomerToolbar/CustomerToolbar";
import CustomerTable from "../../components/customers/CustomerTable/CustomerTable";
import CustomerForm from "../../components/customers/CustomerForm/CustomerForm";

import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/common/Modal/Modal";

import { toast } from "react-toastify";

import "./Customers.css";

const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page:1,
    pages:1,
    total:0,
    limit:10,
  });


  const [showModal,setShowModal] = useState(false);
  const [editingCustomer,setEditingCustomer] = useState(null);



  const fetchCustomers = async()=>{

    try{

      setLoading(true);

      const response = await getCustomers({
        page,
        search,
      });


      setCustomers(response.customers);

      setPagination(response.pagination);


    }catch(error){

      console.error(error);

    }finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchCustomers();

  },[page,search]);




  const handleCreate = async(data)=>{

    try{

      await createCustomer(data);

      toast.success(
        "Customer created successfully."
      );

      setShowModal(false);

      fetchCustomers();


    }catch(error){

      toast.error(
        "Failed creating customer."
      );

    }

  };




  const handleUpdate = async(data)=>{

    try{

      await updateCustomer(
        editingCustomer._id,
        data
      );


      toast.success(
        "Customer updated successfully."
      );


      setEditingCustomer(null);

      setShowModal(false);

      fetchCustomers();


    }catch(error){

      toast.error(
        "Failed updating customer."
      );

    }

  };




  const handleDelete = async(id)=>{

    if(!window.confirm(
      "Delete this customer?"
    )) return;


    try{

      await deleteCustomer(id);

      toast.success(
        "Customer deleted successfully."
      );

      fetchCustomers();


    }catch(error){

      toast.error(
        "Failed deleting customer."
      );

    }

  };




  return (

    <div className="customers-page">


      <div className="page-header">

        <div>

          <h1>
            Customers
          </h1>

          <p>
            Manage your customer records and purchase history.
          </p>

        </div>


      </div>



      <div className="customers-card">


        <CustomerToolbar

          search={search}

          setSearch={setSearch}

          onAdd={()=>{
            setEditingCustomer(null);
            setShowModal(true);
          }}

        />



        <CustomerTable

          customers={customers}

          loading={loading}

          onEdit={(customer)=>{

            setEditingCustomer(customer);

            setShowModal(true);

          }}

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

        onClose={()=>
          setShowModal(false)
        }

      >

        <CustomerForm

          customer={editingCustomer}

          onSubmit={
            editingCustomer
            ? handleUpdate
            : handleCreate
          }

        />


      </Modal>



    </div>

  );

};


export default Customers;