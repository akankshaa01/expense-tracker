import { FaEdit, FaTrash } from "react-icons/fa";

function ExpenseList({ transactions, setTransactions, setEditData}) {

  const handleDelete = async (id) => {
  try {
    await fetch(`http://127.0.0.1:8000/api/delete/${id}/`, {
      method: "DELETE",
    });

    // update UI after delete
    setTransactions(prev => prev.filter(t => t.id !== id));

  } catch (error) {
    console.error(error);
  }
};
const handleEdit = (transaction) => {
  console.log("EDIT CLICKED:", transaction);  
  setEditData(transaction);
};

  return (
    <div className="card">
      <h3>Recent Transactions</h3>

      {transactions.length === 0 && <p>No transactions yet</p>}

      {transactions.map((t) => (
        <div key={t.id} className="expense-item">

          {/* LEFT SIDE */}
          <span className="title">{t.title}</span>

          {/* RIGHT SIDE */}
          <div className="right">
            <span className={t.amount < 0 ? "expense" : "income"}>
              {t.amount < 0 ? "-" : "+"}₹{Math.abs(t.amount)}
            </span>

           <div className="actions">
    <FaEdit 
      className="edit-icon"
      onClick={() => handleEdit(t)}
    />

    <FaTrash 
      className="delete-icon"
      onClick={() => handleDelete(t.id)}
    />
  </div>
          </div>

        </div>
      ))}
    </div>
  );
}
export default ExpenseList;