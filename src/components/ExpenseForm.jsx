import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { useNavigate } from "react-router-dom";

export default function ExpenseForm() {
  const { addExpense } = useContext(ExpenseContext);
  const navigate = useNavigate();

  const [type, setType] = useState("expense"); // expense or income
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const expenseCategories = ["Food", "Travel", "Shopping", "Bills", "Other"];
  const incomeCategories = ["Salary", "Freelance", "Investment", "Other"];

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(newType === "expense" ? "Food" : "Salary");
  };

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || Number(amount) <= 0) {
      alert("Please enter a valid title and amount");
      return;
    }

    addExpense({
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date: date || new Date().toISOString().split("T")[0],
    });

    setTitle("");
    setAmount("");
    navigate("/"); // Redirect to dashboard
  };

  const currentCategories = type === "expense" ? expenseCategories : incomeCategories;

  return (
    <div
      className="card glass-panel p-4 mb-4 fade-in"
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <form onSubmit={submit}>
        <h4 className="text-center mb-4" style={{ fontWeight: 800 }}>
          Create Transaction
        </h4>

        {/* Toggle tabs for Type */}
        <div className="type-tab-container mb-4">
          <div
            className={`type-tab ${type === "expense" ? "active-expense" : ""}`}
            onClick={() => handleTypeChange("expense")}
          >
            Expense
          </div>
          <div
            className={`type-tab ${type === "income" ? "active-income" : ""}`}
            onClick={() => handleTypeChange("income")}
          >
            Income
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-muted" style={{ fontSize: "0.85rem" }}>
            Title
          </label>
          <input
            className="form-control"
            placeholder="e.g. Ganesh Utsav Decoration, Puran Poli Ingredients, Salary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-muted" style={{ fontSize: "0.85rem" }}>
            Amount (₹)
          </label>
          <input
            className="form-control"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold text-muted" style={{ fontSize: "0.85rem" }}>
              Category
            </label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {currentCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-4">
            <label className="form-label fw-semibold text-muted" style={{ fontSize: "0.85rem" }}>
              Date
            </label>
            <input
              className="form-control"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary-custom w-100 py-2 fs-6 fw-bold">
          Add Transaction
        </button>
      </form>
    </div>
  );
}
