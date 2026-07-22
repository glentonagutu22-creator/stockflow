import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./DashboardSalesChart.css";

const DashboardSalesChart = ({ data = [] }) => {
  const chartData = data.map((item) => ({
    day: `${item._id.day}/${item._id.month}`,
    revenue: item.revenue,
  }));

  const totalRevenue = chartData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const highestRevenue =
    chartData.length > 0
      ? Math.max(...chartData.map((d) => d.revenue))
      : 0;

  const formatCurrency = (value) =>
    `KSh ${Number(value).toLocaleString()}`;

  return (
    <section className="dashboard-sales-chart">

      <div className="chart-header">

        <div>
          <span className="chart-badge">
            Revenue Analytics
          </span>

          <h2>Sales Overview</h2>

          <p>Performance over the last 7 days</p>
        </div>

        <div className="chart-summary">

          <div>
            <small>Total Revenue</small>
            <strong>
              {formatCurrency(totalRevenue)}
            </strong>
          </div>

          <div>
            <small>Highest Day</small>
            <strong>
              {formatCurrency(highestRevenue)}
            </strong>
          </div>

        </div>

      </div>

      {chartData.length === 0 ? (
        <div className="chart-empty">
          No sales data available.
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={340}
        >
          <LineChart
            data={chartData}
            margin={{
              top: 15,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6B7280",
                fontSize: 13,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                `${value / 1000}k`
              }
              tick={{
                fill: "#6B7280",
                fontSize: 13,
              }}
            />

            <Tooltip
              formatter={(value) =>
                formatCurrency(value)
              }
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #E5E7EB",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.08)",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563EB"
              strokeWidth={4}
              dot={{
                r: 4,
                fill: "#2563EB",
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  );
};

export default DashboardSalesChart;