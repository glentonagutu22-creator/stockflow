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

  const formatCurrency = (value) =>
    `KSh ${Number(value).toLocaleString()}`;

  return (
    <div className="dashboard-sales-chart">

      <div className="chart-header">

        <div>
          <h2>Sales Revenue</h2>
          <p>Revenue for the last 7 days</p>
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
              top: 10,
              right: 20,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#64748b",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={formatCurrency}
              tick={{
                fill: "#64748b",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) =>
                formatCurrency(value)
              }
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.08)",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={4}
              dot={{
                r: 4,
                fill: "#2563eb",
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

    </div>
  );
};

export default DashboardSalesChart;