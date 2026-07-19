import { useEffect, useState } from "react";

import ProductToolbar from "../../components/products/ProductToolbar/ProductToolbar";
import ProductTable from "../../components/products/ProductTable/ProductTable";
import ProductForm from "../../components/products/ProductForm/ProductForm";
import Modal from "../../components/common/Modal/Modal";
import Pagination from "../../components/Pagination/Pagination";
import { toast } from "react-toastify";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);

     const response = await getProducts({
  search,
  page: currentPage,
  limit: 10,
});

      setProducts(response.data.products);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, currentPage]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (formData) => {
    try {
      if (isEditing) {
        await updateProduct(selectedProduct._id, formData);
      } else {
        await createProduct(formData);
      }

      setIsModalOpen(false);
      setSelectedProduct(null);
      setIsEditing(false);

      fetchProducts();
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wong.")
    }
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDeleteProduct = async () => {
    try {
      await deleteProduct(productToDelete._id);

      setDeleteModalOpen(false);
      setProductToDelete(null);

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ProductToolbar
        search={search}
        setSearch={setSearch}
        onAddProduct={handleAddProduct}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
          setIsEditing(false);
        }}
        title={isEditing ? "Edit Product" : "Add Product"}
      >
        <ProductForm
          initialData={selectedProduct || {}}
          onSubmit={handleSaveProduct}
        />
      </Modal>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        title="Delete Product"
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{productToDelete?.name}</strong>?
        </p>

        <div className="delete-actions">
          <button
            className="cancel-btn"
            onClick={() => {
              setDeleteModalOpen(false);
              setProductToDelete(null);
            }}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={confirmDeleteProduct}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Products;