import { FiEdit2, FiTrash2 } from "react-icons/fi";
import placeholder from "../../../assets/placeholder.png";

const ProductRow = ({ product, onEdit, onDelete }) => {
  const getStockStatus = () => {
    if (product.quantity === 0) {
      return {
        text: "Out of Stock",
        className: "danger",
      };
    }

    if (product.quantity <= product.minimumStock) {
      return {
        text: "Low Stock",
        className: "warning",
      };
    }

    return {
      text: "In Stock",
      className: "success",
    };
  };

  const status = getStockStatus();

  return (
    <tr>
      <td>
        <img
          src={product.image || placeholder.png}
          alt={product.name}
          className="product-image"
        />
      </td>

      <td>{product.sku}</td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>KSh {product.buyingPrice}</td>
      <td>KSh {product.sellingPrice}</td>
      <td>{product.quantity}</td>
      <td>{product.unit}</td>

      <td>
        <span className={`badge ${status.className}`}>
          {status.text}
        </span>
      </td>

      <td>
        <button
          className="edit-btn"
          onClick={() => onEdit(product)}
        >
          <FiEdit2 />
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(product)}
        >
          <FiTrash2 />
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;