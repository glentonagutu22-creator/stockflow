import "./DashboardRecentSales.css";

const DashboardRecentSales = ({
  sales = [],
}) => {
  return (
    <div className="dashboard-recent-sales">

      <div className="recent-sales-header">
        <h2>Recent Sales</h2>
        <span>Latest Transactions</span>
      </div>

      {sales.length === 0 ? (
        <div className="empty-sales">
          No recent sales available.
        </div>
      ) : (
        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>Sale No.</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {sales.map((sale) => (
                <tr key={sale._id}>

                  <td>{sale.saleNumber}</td>

                  <td>
                    {sale.customerName ||
                      "Walk-in Customer"}
                  </td>

                  <td className="amount">
                    KSh{" "}
                    {Number(
                      sale.totalAmount
                    ).toLocaleString()}
                  </td>

                  <td>

                    <span className="payment-badge">
                      {sale.paymentMethod}
                    </span>

                  </td>

                  <td>
                    {new Date(
                      sale.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default DashboardRecentSales;