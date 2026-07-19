import { FiPlus, FiSearch } from "react-icons/fi";
import "./ProductToolbar.css";

const ProductToolbar = ({ search, setSearch, onAddProduct }) => {
  return (
    <div className="product-toolbar">
      <div className="search-box">
        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button className="add-product-btn" onClick={onAddProduct}>
        <FiPlus />
        <span>Add Product</span>
      </button>
    </div>
  );
};

export default ProductToolbar;