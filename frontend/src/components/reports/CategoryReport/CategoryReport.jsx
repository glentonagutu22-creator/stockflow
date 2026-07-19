import "../ReportCommon.css";

const CategoryReport = ({ data }) => {
  return (
    <div className="report-card">
      <h2>Category Report</h2>

      <table className="report-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Products</th>
            <th>Stock</th>
            <th>Inventory Value</th>
          </tr>
        </thead>

        <tbody>
          {data.map((category) => (
            <tr key={category.category}>
              <td>{category.category}</td>
              <td>{category.totalProducts}</td>
              <td>{category.totalStock}</td>
              <td>
               Ksh {Number(category.inventoryValue ?? 0).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryReport;