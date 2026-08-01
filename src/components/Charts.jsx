import { Pie, Bar } from "react-chartjs-2";
import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { ThemeContext } from "../context/ThemeContext";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Charts() {
  const { expenses } = useContext(ExpenseContext);
  const { dark } = useContext(ThemeContext);

  if (!expenses || expenses.length === 0) {
    return (
      <div className="alert glass-panel text-center py-4 border-0 text-muted shadow-sm mb-4">
        No transaction records available. Add some income or expenses to generate charts.
      </div>
    );
  }

  // Filter only expenses for Category-wise chart
  const expenseItems = expenses.filter((e) => e.type === "expense");
  const expenseCategories = [...new Set(expenseItems.map((e) => e.category || "Other"))];
  const categoryTotals = expenseCategories.map((cat) =>
    expenseItems
      .filter((e) => (e.category || "Other") === cat)
      .reduce((sum, e) => sum + Number(e.amount), 0)
  );

  // Income vs Expense Totals
  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalExpense = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  // Chart configuration labels and colors based on Theme
  const textColor = dark ? "#cbd5e1" : "#1e293b";
  const gridColor = dark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: textColor,
          font: {
            family: "Plus Jakarta Sans",
            weight: "600",
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: dark ? "#1e293b" : "#ffffff",
        titleColor: dark ? "#ffffff" : "#0f172a",
        bodyColor: dark ? "#cbd5e1" : "#475569",
        borderColor: dark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        titleFont: { family: "Plus Jakarta Sans", weight: "bold" },
        bodyFont: { family: "Plus Jakarta Sans" },
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { family: "Plus Jakarta Sans", weight: "500" } },
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { family: "Plus Jakarta Sans", weight: "500" } },
      },
    },
  };

  const pieData = {
    labels: expenseCategories.length > 0 ? expenseCategories : ["No Expense Data"],
    datasets: [
      {
        data: expenseCategories.length > 0 ? categoryTotals : [1],
        backgroundColor:
          expenseCategories.length > 0
            ? ["#6366f1", "#f59e0b", "#ec4899", "#3b82f6", "#a78bfa", "#14b8a6", "#6b7280"]
            : [dark ? "#1e293b" : "#e2e8f0"],
        borderWidth: dark ? 2 : 1,
        borderColor: dark ? "#1e293b" : "#ffffff",
      },
    ],
  };

  const barData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#10b981", "#ef4444"],
        borderRadius: 8,
        maxBarThickness: 50,
      },
    ],
  };

  return (
    <div className="row g-4 mt-1">
      <div className="col-md-6">
        <div className="card glass-panel p-4 chart-card" style={{ height: "380px" }}>
          <h5 className="text-center mb-3" style={{ fontWeight: 800 }}>
            Category Breakdown
          </h5>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "270px" }}
          >
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card glass-panel p-4 chart-card" style={{ height: "380px" }}>
          <h5 className="text-center mb-3" style={{ fontWeight: 800 }}>
            Income vs Expenses
          </h5>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "270px" }}
          >
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
