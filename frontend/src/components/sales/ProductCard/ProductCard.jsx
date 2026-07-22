import "./ProductCard.css";
import placeholder from "../../../assets/placeholder.png";

import {
  FiShoppingCart,
} from "react-icons/fi";

const ProductCard = ({
  product,
  onAdd,
}) => {
  const inStock = product.quantity > 0;

  return (
    <div className="product-card">

      <div className="product-image-wrapper">

        <img
          src={product.image || placeholder}
          alt={product.name}
          className="product-image"
        />

        <span
          className={`stock-status ${
            inStock ? "available" : "out"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>

      </div>

      <div className="product-content">

        <small>{product.category}</small>

        <h3>{product.name}</h3>

        <div className="price">
          KSh{" "}
          {Number(
            product.sellingPrice
          ).toLocaleString()}
        </div>

        <div className="stock-row">

          <span>
            Qty: <strong>{product.quantity}</strong>
          </span>

        </div>

        <button
          className="add-cart-btn"
          onClick={() => onAdd(product)}
          disabled={!inStock}
        >
          <FiShoppingCart />

          Add to Cart

        </button>

      </div>

    </div>
  );
};

export default ProductCard;