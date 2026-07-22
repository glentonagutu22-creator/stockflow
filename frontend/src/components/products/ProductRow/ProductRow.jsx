import { FiEdit2, FiTrash2 } from "react-icons/fi";
import placeholder from "../../../assets/placeholder.png";

const ProductRow = ({
  product,
  onEdit,
  onDelete,
}) => {
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
          src={product.image || placeholder}
          alt={product.name}
          className="product-image"
        />

      </td>

      <td>
        <strong>{product.sku}</strong>
      </td>

      <td>

        <div className="product-name">

          <strong>{product.name}</strong>

          {product.description && (
            <small>
              {product.description.length > 40
                ? product.description.substring(0, 40) + "..."
                : product.description}
            </small>
          )}

        </div>

      </td>

      <td>{product.category}</td>

      <td className="price">
        KSh {Number(product.buyingPrice).toLocaleString()}
      </td>

      <td className="price selling-price">
        KSh {Number(product.sellingPrice).toLocaleString()}
      </td>

      <td>

        <span className="quantity-badge">
          {product.quantity}
        </span>

      </td>

      <td>{product.unit}</td>

      <td>

        <span className={`badge ${status.className}`}>
          {status.text}
        </span>

      </td>

      <td>

        <div className="action-buttons">

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

        </div>

      </td>

    </tr>
  );
};

export default ProductRow;