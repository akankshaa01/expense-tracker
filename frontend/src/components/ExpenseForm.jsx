import { useState , useEffect} from "react";

function ExpenseForm({ setTransactions, editData, setEditData }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (editData) {
      console.log("Editing:", editData);
      setTitle(editData.title);
      setAmount(editData.amount);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount) return;

    const newExpense = {
      title: title,              
      amount: Number(amount),
    };

try {
    if (editData) {
      // UPDATE
      const res = await fetch(`http://127.0.0.1:8000/api/update/${editData.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newExpense)
      });

      const updated = await res.json();

      setTransactions(prev =>
        prev.map(t => (t.id === updated.id ? updated : t))
      );

      setEditData(null);

    } else {
      // ADD
      const res = await fetch("http://127.0.0.1:8000/api/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newExpense)
      });

      const data = await res.json();
      setTransactions(prev => [...prev, data]);
    }

    setTitle("");
    setAmount("");

  } catch (error) {
    console.error(error);
  }
};
  

  return (
    <div className="card">
      <h3>Add Transaction</h3>
      <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (+income, -expense)"
          type="number"
        />

        <button className="btn">Add</button>
      </form>
      </div>
    </div>
  );
}

export default ExpenseForm; 