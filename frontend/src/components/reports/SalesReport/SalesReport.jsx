import "../ReportCommon.css";

const SalesReport = ({ data }) => {
  return (
    <div className="report-card">
      <h2>Sales Report</h2>

      <div className="report-grid">
        <div>
          <span>Total Orders</span>
          <strong>{data.totalOrders || 0}</strong>
        </div>

        <div>
          <span>Total Revenue</span>
          <strong>
          Ksh {Number(data.totalRevenue ?? 0).toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Items Sold</span>
          <strong>{data.totalItemsSold || 0}</strong>
        </div>

        <div>
          <span>Profit</span>
          <strong>
            Ksh {(data.totalProfit || 0).toLocaleString()}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;