import {
  MdWarningAmber,
  MdInventory2,
} from "react-icons/md";

import "./DashboardLowStock.css";

const DashboardLowStock = ({
  products = [],
}) => {
  return (
    <div className="dashboard-low-stock">

      <div className="low-stock-header">

        <div>
          <h2>Low Stock Products</h2>
          <span>
            Requires attention
          </span>
        </div>

        <div className="warning-icon">
          <MdWarningAmber />
        </div>

      </div>

      {products.length === 0 ? (
        <div className="empty-low-stock">

          <MdInventory2 />

          <p>
            All products have sufficient
            stock.
          </p>

        </div>
      ) : (
        <div className="low-stock-list">

          {products.map((product) => (
            <div
              className="low-stock-item"
              key={product._id}
            >
              <div>

                <h4>{product.name}</h4>

                <span>
                  SKU: {product.sku}
                </span>

              </div>

              <div className="stock-badge">
                {product.stock} left
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default DashboardLowStock;