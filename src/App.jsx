import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExpenseProvider } from "./context/ExpenseContext";
import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Stats from "./pages/Stats";
import  AuthProvider  from "./context/AuthContext";


import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ExpenseProvider>
          <BrowserRouter>
            <Navbar />

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add"
                element={
                  <ProtectedRoute>
                    <AddExpense />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/stats"
                element={
                  <ProtectedRoute>
                    <Stats />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ExpenseProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
