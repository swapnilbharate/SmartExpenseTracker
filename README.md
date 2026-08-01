# 💸 MahaSpend (SmartExpenseTracker)

MahaSpend is a modern, responsive, and beautifully animated Expense Tracker application built with React and Vite. It helps you track your wealth, manage your budget, and visualize your financial health with an intuitive user interface inspired by Swarajya themes and Paithani aesthetics.

## ✨ Features

- **📊 Comprehensive Dashboard**: Get a bird's eye view of your Net Balance, Total Income, and Total Expenses.
- **📈 Visual Analytics**: Interactive charts showing Category Breakdown (Pie Chart) and Income vs. Expenses (Bar Chart) using Chart.js.
- **🎬 Smooth Animations**: Premium page transitions and list interactions powered by Framer Motion.
- **🗂️ Advanced Filtering & Sorting**: Filter transactions by Type (Income/Expense) and Category. Sort by Date or Amount.
- **📥 Data Export**: Instantly download your filtered expense data as a CSV file.
- **🔐 User Authentication**: Ready-to-use Login and Register flows with Protected Routes.
- **🌓 Theme Support**: Built-in context for Light/Dark mode themes.
- **💡 Financial Wisdom**: Context-aware tips to help you stay within your budget.

## 📸 Screenshots


### Dashboard & Analytics
<img width="1907" height="812" alt="Screenshot 2026-08-01 194139" src="https://github.com/user-attachments/assets/c493ef77-d7a2-47ff-b9b9-9ce3d98fd919" />

### Recent Transactions
<img width="1885" height="840" alt="Screenshot 2026-08-01 194202" src="https://github.com/user-attachments/assets/d7733578-ee0c-4da9-a874-956a5a68b350" />


## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Styling**: Vanilla CSS with Bootstrap 5
- **Animations**: Framer Motion
- **Charting**: Chart.js & react-chartjs-2
- **Linting**: ESLint

## 🚀 Quick Start

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/swapnilbharate/SmartExpenseTracker.git
   cd SmartExpenseTracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`.

## 📁 Project Structure

```text
src/
├── assets/         # Images, icons, etc.
├── components/     # Reusable UI components (Navbar, ExpenseList, Charts, etc.)
├── context/        # React Context providers (ExpenseContext, AuthContext, ThemeContext)
├── pages/          # Main application pages (Dashboard, Login, Stats, etc.)
├── App.jsx         # Application root & Routing setup
├── main.jsx        # Entry point
└── index.css       # Global styles and Paithani aesthetics
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a Pull Request if you have suggestions for improvements.
