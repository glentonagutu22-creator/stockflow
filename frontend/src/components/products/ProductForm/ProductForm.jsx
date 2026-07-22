import { useEffect, useState } from "react";
import "./ProductForm.css";
import { getCategories } from "../../../services/categoryService";

const emptyForm = {
  name: "",
  description: "",
  category: "",
  buyingPrice: "",
  sellingPrice: "",
  quantity: "",
  minimumStock: "",
  unit: "",
  image: null,
};

const ProductForm = ({
  initialData = {},
  onSubmit,
}) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories({
          page: 1,
          limit: 1000,
        });

        setCategories(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (
      initialData &&
      Object.keys(initialData).length > 0
    ) {
      setFormData({
        ...emptyForm,
        name: initialData.name || "",
        description:
          initialData.description || "",
        category: initialData.category || "",
        buyingPrice:
          initialData.buyingPrice || "",
        sellingPrice:
          initialData.sellingPrice || "",
        quantity: initialData.quantity || "",
        minimumStock:
          initialData.minimumStock || "",
        unit: initialData.unit || "",
        image: null,
      });

      setPreview(initialData.image || "");
    } else {
      setFormData(emptyForm);
      setPreview("");
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      className="product-form"
      onSubmit={handleSubmit}
    >
      {/* Product Information */}

      <div className="form-section">

        <h3>Product Information</h3>

        <div className="form-grid">

          <div className="form-group">

            <label>Product Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}

            </select>

          </div>

        </div>

        <div className="form-group">

          <label>Description</label>

          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the product..."
          />

        </div>

      </div>

      {/* Pricing */}

      <div className="form-section">

        <h3>Pricing</h3>

        <div className="form-grid">

          <div className="form-group">

            <label>Buying Price</label>

            <input
              type="number"
              name="buyingPrice"
              value={formData.buyingPrice}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Selling Price</label>

            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              required
            />

          </div>

        </div>

      </div>

      {/* Inventory */}

      <div className="form-section">

        <h3>Inventory</h3>

        <div className="form-grid">

          <div className="form-group">

            <label>Quantity</label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Minimum Stock</label>

            <input
              type="number"
              name="minimumStock"
              value={formData.minimumStock}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Unit</label>

            <input
              type="text"
              name="unit"
              placeholder="pcs, kg, litre..."
              value={formData.unit}
              onChange={handleChange}
              required
            />

          </div>

        </div>

      </div>

      {/* Image */}

      <div className="form-section">

        <h3>Product Image</h3>

        <div className="image-upload">

          {preview ? (

            <img
              src={preview}
              alt="Preview"
              className="image-preview"
            />

          ) : (

            <div className="upload-placeholder">

              <span>📷</span>

              <p>No image selected</p>

            </div>

          )}

         <label className="upload-btn">
  Upload Photo

  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
  />
</label>

        </div>

      </div>

      <button
        type="submit"
        className="save-btn"
      >
        Save Product
      </button>

    </form>
  );
};

export default ProductForm;