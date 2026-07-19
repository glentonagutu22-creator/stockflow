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
    page: 1,
    pages: 1,
    total: 0,
    limit: 10,
  });

  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const response = await getCustomers({
        page,
        search,
      });

      setCustomers(response.customers);
      setPagination(response.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, search]);

  const handleCreate = async (formData) => {
    await createCustomer(formData);
  toast.success("Customer created successfully.");
    setShowModal(false);

    fetchCustomers();
  };

  const handleUpdate = async (formData) => {
    await updateCustomer(editingCustomer._id, formData);
  toast.success("Customer updated successfully.");
    setEditingCustomer(null);
    setShowModal(false);

    fetchCustomers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    await deleteCustomer(id);
  toast.success("Customer deleted successfully.");
    fetchCustomers();
  };

  const openCreateModal = () => {
    setEditingCustomer(null);
    setShowModal(true);
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  return (
    <div className="customers-page">

      <CustomerToolbar
        search={search}
        setSearch={setSearch}
        onAdd={openCreateModal}
      />

      <CustomerTable
        customers={customers}
        loading={loading}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.pages}
        onPageChange={setPage}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
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