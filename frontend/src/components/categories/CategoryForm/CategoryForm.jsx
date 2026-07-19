import { useEffect, useState } from "react";
import "./CategoryForm.css";

const initialState = {
  name: "",
  description: "",
  status: "Active",
};

const CategoryForm = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      className="category-form"
      onSubmit={handleSubmit}
    >
      <h2>
        {initialData ? "Edit Category" : "Add Category"}
      </h2>

      <input
        name="name"
        placeholder="Category name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <div className="category-form-actions">
        <button type="submit">
          Save
        </button>

        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;