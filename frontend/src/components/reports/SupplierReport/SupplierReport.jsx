import "../ReportCommon.css";

const SupplierReport = ({ data }) => {
  return (
    <div className="report-card">
      <h2>Supplier Report</h2>

      <table className="report-table">
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Purchases</th>
            <th>Total Amount</th>
          </tr>
        </thead>

        <tbody>
          {data.map((supplier) => (
            <tr key={supplier.supplierId}>
              <td>{supplier.supplierName}</td>
              <td>{supplier.totalPurchases}</td>
              <td>
                Ksh {Number(supplier.totalAmount ?? 0).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierReport;