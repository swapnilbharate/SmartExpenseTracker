import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import ExpenseList from "../components/ExpenseList";
import Budget from "../components/Budget";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { expenses } = useContext(ExpenseContext);

  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalExpense = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="container py-2"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Overview Greeting */}
      <motion.div variants={itemVariants} className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h2 className="mb-1" style={{ fontWeight: 800 }}>
            MahaSpend Dashboard
          </h2>
          <p className="text-muted m-0">Namaskar! Track your Swarajya wealth and control your budget.</p>
        </div>
        <Link
          to="/add"
          className="btn btn-primary-custom px-4 py-2 fw-semibold d-flex align-items-center"
          style={{ width: "auto" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="me-2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Transaction
        </Link>
      </motion.div>

      {/* Paithani Gold Zari Accent Border */}
      <motion.div variants={itemVariants} className="paithani-accent"></motion.div>

      {/* SUMMARY CARDS */}
      <motion.div variants={itemVariants} className="row g-4 mb-4">
        {/* Balance Card */}
        <div className="col-12 col-md-4">
          <div className="card glass-panel p-4 stat-card-balance border-0">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span
                  className="text-muted fw-semibold"
                  style={{
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Net Balance
                </span>
                <h2 className="mt-2 mb-0 fw-extrabold" style={{ fontSize: "1.85rem" }}>
                  ₹ {totalBalance}
                </h2>
              </div>
              <div className="rounded-3 p-2 bg-primary bg-opacity-10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12" y2="18.01"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Income Card */}
        <div className="col-12 col-md-4">
          <div className="card glass-panel p-4 stat-card-income border-0">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span
                  className="text-muted fw-semibold"
                  style={{
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Total Income
                </span>
                <h2 className="mt-2 mb-0 fw-extrabold text-success" style={{ fontSize: "1.85rem" }}>
                  ₹ {totalIncome}
                </h2>
              </div>
              <div className="rounded-3 p-2 bg-success bg-opacity-10 text-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Card */}
        <div className="col-12 col-md-4">
          <div className="card glass-panel p-4 stat-card-expense border-0">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span
                  className="text-muted fw-semibold"
                  style={{
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Total Expenses
                </span>
                <h2 className="mt-2 mb-0 fw-extrabold text-danger" style={{ fontSize: "1.85rem" }}>
                  ₹ {totalExpense}
                </h2>
              </div>
              <div className="rounded-3 p-2 bg-danger bg-opacity-10 text-danger">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                  <polyline points="17 18 23 18 23 12"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MAIN LAYOUT GRID */}
      <div className="dashboard-grid">
        {/* Left Side: Transactions List */}
        <motion.div variants={itemVariants}>
          <ExpenseList />
        </motion.div>

        {/* Right Side: Budget and Quick Actions */}
        <motion.div variants={itemVariants}>
          <Budget />

          {/* Quick Info card */}
          <div className="card glass-panel p-4 mb-4">
            <h5 className="mb-3" style={{ fontWeight: 800 }}>
              💡 Financial Wisdom
            </h5>
            <p className="text-muted small mb-0" style={{ lineHeight: "1.5" }}>
              {totalExpense > totalIncome * 0.8 && totalIncome > 0 ? (
                <span className="text-warning">
                  ⚠️ Your expenses have crossed 80% of your income. Consider curbing non-essential spending. As the old Marathi saying goes: "अंथरूण पाहून पाय पसरावे" (Stretch your feet according to the size of your bed).
                </span>
              ) : (
                <span>
                  ✨ You are in a healthy spending zone! Remember to set aside savings for upcoming festivals like Ganesh Utsav and Diwali. Early budget planning avoids financial stress.
                </span>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
