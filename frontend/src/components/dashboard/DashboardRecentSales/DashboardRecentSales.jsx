import "./DashboardRecentSales.css";

const DashboardRecentSales = ({
  sales = [],
}) => {
  const getInitials = (name) => {
    if (!name) return "W";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section className="dashboard-recent-sales">

      <div className="recent-sales-header">

        <div>
          <h2>Recent Sales</h2>
          <p>Latest completed transactions</p>
        </div>

        <span className="sales-count">
          {sales.length} Sales
        </span>

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
                <th>Sale</th>
                <th>Customer</th>
                <th>Payment</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {sales.map((sale) => {

                const customer =
                  sale.customerName ||
                  "Walk-in Customer";

                return (

                  <tr key={sale._id}>

                    <td>
                      <strong>{sale.saleNumber}</strong>
                    </td>

                    <td>

                      <div className="customer-cell">

                        <div className="customer-avatar">
                          {getInitials(customer)}
                        </div>

                        <span>{customer}</span>

                      </div>

                    </td>

                    <td>

                      <span className="payment-badge">
                        {sale.paymentMethod}
                      </span>

                    </td>

                    <td className="amount">
                      KSh{" "}
                      {Number(
                        sale.totalAmount
                      ).toLocaleString()}
                    </td>

                    <td>
                      {new Date(
                        sale.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                );
              })}

            </tbody>

          </table>

        </div>
      )}

    </section>
  );
};

export default DashboardRecentSales;