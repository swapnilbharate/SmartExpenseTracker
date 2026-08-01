import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import ExpenseItem from "./ExpenseItem";
import { AnimatePresence } from "framer-motion";

export default function ExpenseList() {
  const { expenses } = useContext(ExpenseContext);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  const filteredAndSorted = expenses
    .filter((e) => {
      const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || e.category === categoryFilter;
      const matchesType = typeFilter === "all" || e.type === typeFilter;
      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "amount-asc") return a.amount - b.amount;
      return 0;
    });

  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Salary",
    "Freelance",
    "Investment",
    "Other",
  ];

  const downloadCSV = () => {
    if (filteredAndSorted.length === 0) return;
    const headers = ["Title", "Amount", "Category", "Type", "Date"];
    const rows = filteredAndSorted.map((e) => [
      `"${e.title}"`,
      e.amount,
      e.category,
      e.type,
      new Date(e.date).toLocaleDateString(),
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="card glass-panel p-4 mb-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h4 className="m-0" style={{ fontWeight: 800 }}>
          Recent Transactions
        </h4>

        {/* Search Bar & Export */}
        <div className="d-flex gap-2" style={{ maxWidth: "300px", width: "100%" }}>
          <input
            className="form-control"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-outline-primary d-flex align-items-center justify-content-center"
            onClick={downloadCSV}
            title="Download CSV"
            style={{ padding: "0.375rem 0.75rem" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.8rem" }}>
            Type
          </label>
          <select
            className="form-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.8rem" }}>
            Category
          </label>
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.8rem" }}>
            Sort By
          </label>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Transaction List */}
      <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "4px" }}>
        {filteredAndSorted.length > 0 ? (
          <AnimatePresence>
            {filteredAndSorted.map((e) => (
              <ExpenseItem key={e.id} expense={e} />
            ))}
          </AnimatePresence>
        ) : (
          <div className="text-center py-5 text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-3 text-muted"
              style={{ opacity: 0.5 }}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <p className="m-0 fw-semibold">No transactions found</p>
            <p className="small text-muted mt-1">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
