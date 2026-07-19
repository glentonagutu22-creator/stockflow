import "./ProductCard.css";

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>

      <p>{product.category}</p>

      <strong>KSh {product.sellingPrice.toLocaleString()}</strong>

      <p>
  Stock:{" "}
  <strong
    style={{
      color: product.quantity > 0 ? "green" : "red",
    }}
  >
    {product.quantity}
  </strong>
</p>

      <button
        onClick={() => onAdd(product)}
        disabled={product.quantity === 0}
      >
        Add
      </button>
    </div>
  );
};

export default ProductCard;