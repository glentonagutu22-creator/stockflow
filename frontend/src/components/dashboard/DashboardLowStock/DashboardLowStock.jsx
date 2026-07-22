import {
  MdWarningAmber,
  MdInventory2,
} from "react-icons/md";

import "./DashboardLowStock.css";

const DashboardLowStock = ({
  products = [],
}) => {
  return (
    <section className="dashboard-low-stock">

      <div className="low-stock-header">

        <div>

          <span className="low-stock-badge">
            Inventory Alert
          </span>

          <h2>Low Stock</h2>

          <p>
            Products that need restocking
          </p>

        </div>

        <div className="warning-icon">
          <MdWarningAmber />
        </div>

      </div>

      {products.length === 0 ? (

        <div className="empty-low-stock">

          <MdInventory2 />

          <h3>Inventory Healthy</h3>

          <p>
            All products are above their
            minimum stock level.
          </p>

        </div>

      ) : (

        <div className="low-stock-list">

          {products.map((product) => (

            <div
              className="low-stock-item"
              key={product._id}
            >

              <div className="product-info">

                <h4>{product.name}</h4>

                <small>{product.sku}</small>

              </div>

              <div className="stock-info">

                <span className="stock-count">
                  {product.quantity}
                </span>

                <small>Remaining</small>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
};

export default DashboardLowStock;