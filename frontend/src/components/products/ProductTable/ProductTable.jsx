import "./ProductTable.css";
import ProductRow from "../ProductRow/ProductRow";

const ProductTable = ({
  products,
  onEdit,
  onDelete,
}) => {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>SKU</th>
          <th>Name</th>
          <th>Category</th>
          <th>Buying</th>
          <th>Selling</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <ProductRow
            key={product._id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;