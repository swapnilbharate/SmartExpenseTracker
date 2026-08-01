import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function Budget() {
  const { expenses, budget, updateBudget } = useContext(ExpenseContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newLimit, setNewLimit] = useState(budget);

  const totalExpense = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const percent = budget > 0 ? Math.min((totalExpense / budget) * 100, 100) : 0;
  const displayPercent = budget > 0 ? Math.round((totalExpense / budget) * 100) : 0;

  const handleSave = () => {
    updateBudget(newLimit);
    setIsEditing(false);
  };

  const getBarColorClass = () => {
    if (displayPercent >= 100) return "bg-danger";
    if (displayPercent >= 80) return "bg-warning";
    return "bg-success";
  };

  return (
    <div className="card glass-panel p-4 mb-4 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h5
            className="text-muted mb-1"
            style={{
              fontSize: "0.825rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Monthly Budget Limit
          </h5>
          {isEditing ? (
            <div className="d-flex align-items-center">
              <span className="fs-4 fw-bold me-1 text-primary">₹</span>
              <input
                type="number"
                className="form-control form-control-sm me-2 fw-bold"
                style={{ width: "120px", fontSize: "1.1rem" }}
                value={newLimit}
                onChange={(e) => setNewLimit(Number(e.target.value))}
                autoFocus
              />
              <button
                className="btn btn-sm btn-success px-2 rounded-3 me-1"
                onClick={handleSave}
                style={{ width: "auto" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
              <button
                className="btn btn-sm btn-light px-2 rounded-3 text-secondary"
                onClick={() => {
                  setNewLimit(budget);
                  setIsEditing(false);
                }}
                style={{ width: "auto" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <span className="fs-3 fw-extrabold text-primary me-2">₹ {budget}</span>
              <button
                className="btn btn-sm btn-light border-0 rounded-circle p-1 text-muted"
                onClick={() => {
                  setNewLimit(budget);
                  setIsEditing(true);
                }}
                title="Edit Budget"
                style={{ width: "26px", height: "26px", padding: 0 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
        <div className="text-end">
          <span
            className="text-muted"
            style={{
              fontSize: "0.825rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Total Spent
          </span>
          <div className="fs-3 fw-bold">₹ {totalExpense}</div>
        </div>
      </div>

      <div className="budget-progress-container">
        <div
          className={`budget-progress-bar ${getBarColorClass()}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div className="text-muted" style={{ fontSize: "0.8rem" }}>
          {displayPercent}% of your budget spent
        </div>
        {displayPercent >= 100 ? (
          <span className="badge bg-danger px-2 py-1 rounded-pill" style={{ fontSize: "0.75rem" }}>
            Over Budget!
          </span>
        ) : displayPercent >= 80 ? (
          <span
            className="badge bg-warning text-dark px-2 py-1 rounded-pill"
            style={{ fontSize: "0.75rem" }}
          >
            Approaching Limit
          </span>
        ) : (
          <span className="badge bg-success px-2 py-1 rounded-pill" style={{ fontSize: "0.75rem" }}>
            Safe Zone
          </span>
        )}
      </div>
    </div>
  );
}
