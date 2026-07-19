import "../ReportCommon.css";

const LowStockReport = ({ data }) => {
  return (
    <div className="report-card">
      <h2>Low Stock Products</h2>

      <table className="report-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Minimum</th>
          </tr>
        </thead>

        <tbody>
          {data.map((product) => (
            <tr key={product.sku}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.minimumStock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockReport;