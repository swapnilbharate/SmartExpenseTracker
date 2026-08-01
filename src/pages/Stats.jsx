import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import Charts from "../components/Charts";

export default function Stats() {
  const { expenses } = useContext(ExpenseContext);
  const [filterType, setFilterType] = useState("all");

  const income = expenses
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const expense = expenses
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  const balance = income - expense;

  const filteredTransactions = expenses.filter(
    (t) => filterType === "all" || t.type === filterType
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="container mt-4 fade-in py-2">
      <h2 className="mb-4" style={{ fontWeight: 800 }}>
        📊 Expense Statistics
      </h2>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card glass-panel p-4 stat-card-income border-0">
            <h5
              className="text-muted"
              style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}
            >
              Total Income
            </h5>
            <h3 className="fw-extrabold text-success mb-0">₹ {income}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card glass-panel p-4 stat-card-expense border-0">
            <h5
              className="text-muted"
              style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}
            >
              Total Expense
            </h5>
            <h3 className="fw-extrabold text-danger mb-0">₹ {expense}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card glass-panel p-4 stat-card-balance border-0">
            <h5
              className="text-muted"
              style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}
            >
              Balance
            </h5>
            <h3 className="fw-extrabold text-primary mb-0">₹ {balance}</h3>
          </div>
        </div>
      </div>

      {/* CHART SECTION */}
      <Charts />

      {/* TABLE SECTION */}
      <div className="card glass-panel p-4 mt-4 mb-5 border-0">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-3">
          <h5 className="m-0" style={{ fontWeight: 800 }}>
            Recent Transactions
          </h5>

          <div style={{ maxWidth: "200px", width: "100%" }}>
            <select
              className="form-select form-select-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="income">Income Only</option>
              <option value="expense">Expenses Only</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table mt-2 align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Type</th>
                <th className="text-end">Amount</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t) => (
                  <tr key={t.id}>
                    <td className="fw-semibold" style={{ color: "var(--text-main)" }}>
                      {t.title}
                    </td>
                    <td className="text-muted">{t.category}</td>
                    <td className="text-muted">{formatDate(t.date)}</td>
                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-1.5 fw-bold ${
                          t.type === "income"
                            ? "bg-success bg-opacity-10 text-success"
                            : "bg-danger bg-opacity-10 text-danger"
                        }`}
                        style={{ fontSize: "0.7rem", textTransform: "uppercase" }}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td
                      className={`text-end fw-bold ${
                        t.type === "income" ? "text-success" : "text-danger"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"} ₹ {t.amount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No transactions match the filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
