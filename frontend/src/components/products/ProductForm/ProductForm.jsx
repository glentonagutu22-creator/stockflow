import { useEffect, useState } from "react";
import "./ProductForm.css";
import { getCategories } from "../../../services/categoryService";
const ProductForm = ({ initialData = {}, onSubmit }) => {
  const [categories, setCategories] = useState([]);
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
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    buyingPrice: "",
    sellingPrice: "",
    quantity: "",
    minimumStock: "",
    unit: "",
    image: "",
  });

  useEffect(() => {
    setFormData({
      name: initialData.name || "",
      description: initialData.description || "",
      category: initialData.category || "",
      buyingPrice: initialData.buyingPrice || "",
      sellingPrice: initialData.sellingPrice || "",
      quantity: initialData.quantity || "",
      minimumStock: initialData.minimumStock || "",
      unit: initialData.unit || "",
      image: initialData.image || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        quired<select
    name="category"
    value={formData.category}
    onChange={handleChange}
>
    <option value="">Select Category</option>

    {categories.map(category => (
        <option
            key={category._id}
            value={category.name}
        >
            {category.name}
        </option>
    ))}
</select>
        
      </div>

      <div className="form-row">
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

      <div className="form-row">
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
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Unit</label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className="save-btn">
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;