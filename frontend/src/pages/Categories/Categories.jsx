import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./Categories.css";

import CategoryToolbar from "../../components/categories/CategoryToolbar/CategoryToolbar";
import CategoryTable from "../../components/categories/CategoryTable/CategoryTable";
import CategoryForm from "../../components/categories/CategoryForm/CategoryForm";
import Modal from "../../components/common/Modal/Modal";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await getCategories({
        page,
        search,
      });

      setCategories(response.data.categories);

      setTotalPages(response.data.pages);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch categories"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, search]);

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);

      toast.success("Category deleted successfully");

      fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory._id, data);

        toast.success("Category updated successfully");
      } else {
        await createCategory(data);

        toast.success("Category created successfully");
      }

      setIsModalOpen(false);

      fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Operation failed"
      );
    }
  };

  return (
    <div className="categories-page">
      <CategoryToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleCreate}
      />

      <CategoryTable
        categories={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <CategoryForm
          initialData={selectedCategory}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Categories;