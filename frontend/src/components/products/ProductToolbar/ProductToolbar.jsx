import { FiPlus, FiSearch } from "react-icons/fi";
import "./ProductToolbar.css";

const ProductToolbar = ({
  search,
  setSearch,
  onAddProduct,
}) => {
  return (
    <div className="product-toolbar">

      <div>

        <span className="toolbar-badge">
          Inventory Management
        </span>

        <h1>Products</h1>

        <p>
          Manage your products, pricing and stock.
        </p>

      </div>

      <div className="toolbar-actions">

        <div className="search-box">

          <FiSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search by product, SKU or category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <button
          className="add-product-btn"
          onClick={onAddProduct}
        >
          <FiPlus />
          <span>Add Product</span>
        </button>

      </div>

    </div>
  );
};

export default ProductToolbar;