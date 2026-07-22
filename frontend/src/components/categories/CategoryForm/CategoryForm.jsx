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

  const [formData, setFormData] =
    useState(initialState);


  useEffect(() => {

    if (initialData) {

      setFormData({
        name: initialData.name || "",
        description:
          initialData.description || "",
        status:
          initialData.status || "active",
      });

    } else {

      setFormData(initialState);

    }

  }, [initialData]);



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
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
        {initialData
          ? "Edit Category"
          : "Add Category"}
      </h2>


      <div className="category-form-group">

        <label>
          Category Name
        </label>

        <input
          name="name"
          placeholder="Enter category name"
          value={formData.name}
          onChange={handleChange}
          required
        />

      </div>



      <div className="category-form-group">

        <label>
          Description
        </label>

        <textarea
          name="description"
          rows="4"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
        />

      </div>



      <div className="category-form-group">

        <label>
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>

        </select>

      </div>



      <div className="category-form-actions">


        <button
          type="submit"
          className="save-category-btn"
        >
          Save Category
        </button>



        <button
          type="button"
          className="cancel-category-btn"
          onClick={onCancel}
        >
          Cancel
        </button>


      </div>


    </form>

  );
};


export default CategoryForm;