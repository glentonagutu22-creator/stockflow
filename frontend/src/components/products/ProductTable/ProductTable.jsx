import "./ProductTable.css";
import ProductRow from "../ProductRow/ProductRow";

const ProductTable = ({
  products,
  onEdit,
  onDelete,
}) => {
  if (products.length === 0) {
    return (
      <div className="empty-products">
        <h3>No Products Found</h3>
        <p>
          Add your first product to start managing
          inventory.
        </p>
      </div>
    );
  }

  return (
    <div className="product-table-card">

      <div className="product-table-header">

        <div>
          <h2>Products</h2>
          <p>
            Manage your inventory and stock levels
          </p>
        </div>

        <span className="product-count">
          {products.length} Products
        </span>

      </div>

      <div className="table-wrapper">

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

      </div>

    </div>
  );
};

export default ProductTable;