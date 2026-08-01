import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(5000);

  // Load user data when user changes
  useEffect(() => {
    if (user && user.email) {
      const userExpensesKey = `expenses_${user.email}`;
      const userBudgetKey = `budget_${user.email}`;

      const storedExpenses = JSON.parse(localStorage.getItem(userExpensesKey)) || [];
      const storedBudget = Number(localStorage.getItem(userBudgetKey)) || 5000;

      setExpenses(storedExpenses);
      setBudget(storedBudget);
    } else {
      setExpenses([]);
      setBudget(5000);
    }
  }, [user]);

  const addExpense = (expense) => {
    if (!user || !user.email) return;
    const userExpensesKey = `expenses_${user.email}`;
    const updated = [expense, ...expenses]; // Put new transactions first
    setExpenses(updated);
    localStorage.setItem(userExpensesKey, JSON.stringify(updated));
  };

  const deleteExpense = (id) => {
    if (!user || !user.email) return;
    const userExpensesKey = `expenses_${user.email}`;
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    localStorage.setItem(userExpensesKey, JSON.stringify(updated));
  };

  const updateBudget = (newLimit) => {
    if (!user || !user.email) return;
    const userBudgetKey = `budget_${user.email}`;
    const limit = Number(newLimit) || 0;
    setBudget(limit);
    localStorage.setItem(userBudgetKey, limit.toString());
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, budget, addExpense, deleteExpense, updateBudget }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
