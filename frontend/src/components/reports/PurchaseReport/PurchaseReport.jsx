import "../ReportCommon.css";

const PurchaseReport = ({ data }) => {
  return (
    <div className="report-card">
      <h2>Purchase Report</h2>

      <div className="report-grid">
        <div>
          <span>Total Purchases</span>
         <strong>
  {Number(data.totalPurchases || 0).toLocaleString()}
</strong>
        </div>

        <div>
          <span>Total Amount</span>
          <strong>
            Ksh {(data.totalAmount || 0).toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Total Items</span>
          <strong>{data.totalItems || 0}</strong>
        </div>

        <div>
          <span>Average Purchase</span>
          <strong>
            Ksh {(data.averagePurchaseValue || 0).toLocaleString()}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default PurchaseReport;