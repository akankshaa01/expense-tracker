import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Analytics({ transactions }) {
  const amounts = transactions.map(t => t.amount);

  const income = amounts
    .filter(a => a > 0)
    .reduce((acc, a) => acc + a, 0);

  const expense = amounts
    .filter(a => a < 0)
    .reduce((acc, a) => acc + a, 0);

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: Math.abs(expense) }
  ];

  const COLORS = ["#22c55e", "#ef4444"]; // green, red

  return (
    <div className="card">
      <h3>Analytics</h3>

      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default Analytics;