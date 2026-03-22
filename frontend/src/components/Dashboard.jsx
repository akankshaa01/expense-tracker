function Dashboard({ transactions }) {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expense;
  


  return (
    <div className="dashboard">
      <div className="card">
        <h3>Balance</h3>
        <h2>₹{balance}</h2>
      </div>

      <div className="card">
        <h3>Income</h3>
        <h2 style={{ color: "#22c55e" }}>₹{income}</h2>
      </div>

      <div className="card">
        <h3>Expense</h3>
        <h2 style={{ color: "#ef4444" }}>
          ₹{Math.abs(expense)}
        </h2>
      </div>
    </div>
  );
}

export default Dashboard;