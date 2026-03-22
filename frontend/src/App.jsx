import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Analytics from "./components/Analytics";
import "./styles/theme.css";
import { useState, useEffect } from "react";
import { FaHome, FaPlus, FaChartBar } from "react-icons/fa";


function App() {
  const [transactions, setTransactions] = useState([]);
  const [editData, setEditData] = useState(null);
  const [activePage, setActivePage] = useState("Dashboard");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/expenses/")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched:", data);
        
        setTransactions(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="app">
      <div className="sidebar">
  <h2 className="logo">Expense Tracker</h2>

  <ul className="menu">
    <li  className={activePage === "Dashboard" ? "active" : ""}
  onClick={() => setActivePage("Dashboard")}>
      <FaHome className="icon" />
      <span>Dashboard</span>
    </li>

    <li onClick={() => {
      setActivePage("Add Transaction");
      document.getElementById("form").scrollIntoView({ behavior: "smooth" });
    }}>
      <FaPlus className="icon" />
      <span>Add Transaction</span>
    </li>
 <li onClick={() => setActivePage("Analytics")}>
      <FaChartBar className="icon" />
      <span>Analytics</span>
    </li>
  </ul>
</div>

      <div className="main">
        <Navbar activePage={activePage} />

        <div className="container">
          <Dashboard transactions={transactions}/> 
          <div className="bottom-section">
            <ExpenseForm setTransactions={setTransactions} 
            editData={editData}
            setEditData={setEditData}
          />


            <ExpenseList transactions={transactions} setTransactions={setTransactions} 
            setEditData={setEditData}/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;