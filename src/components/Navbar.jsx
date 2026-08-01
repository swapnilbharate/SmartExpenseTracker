import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { dark, setDark } = useContext(ThemeContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const closeNav = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg glass-nav py-3 px-4 shadow-sm mb-4">
      <div className="container-fluid">
        <Link
          className="navbar-brand d-flex align-items-center fw-extrabold text-primary"
          to="/"
          onClick={closeNav}
          style={{ fontSize: "1.45rem", letterSpacing: "-0.5px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="me-2 text-primary"
          >
            <line x1="4" y1="2" x2="4" y2="22"></line>
            <path d="M4 4 L20 7 L15 10 L20 13 L4 16 Z" fill="var(--primary)"></path>
          </svg>
          <span style={{ color: "var(--text-main)", fontWeight: 800 }}>Maha</span>
          <span style={{ color: "var(--primary)", fontWeight: 800 }}>Spend</span>
        </Link>

        {/* Mobile Toggle Button */}
        <div className="d-flex align-items-center d-lg-none">
          <button
            className="btn btn-sm btn-light border-0 me-2 rounded-3 p-2"
            onClick={() => setDark(!dark)}
            title="Toggle Dark Mode"
            style={{
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.72" x2="5.64" y2="18.3"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>
          
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            style={{ padding: "0.25rem 0.5rem" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${isOpen ? "show mt-3" : ""}`} id="navbarNav">
          {user ? (
            <div className="d-flex flex-column flex-lg-row align-items-lg-center ms-auto gap-2 gap-lg-0">
              
              <div className="d-flex align-items-center mb-3 mb-lg-0 me-lg-4">
                <div
                  className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle fw-bold me-2"
                  style={{ width: "36px", height: "36px", fontSize: "0.85rem" }}
                >
                  {getInitials(user.name)}
                </div>
                <div className="text-start">
                  <div
                    className="fw-bold"
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: "1.2",
                      color: "var(--text-main)",
                    }}
                  >
                    Namaskar, {user.name.split(" ")[0]}!
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                    Wealth Dashboard
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column flex-lg-row gap-2">
                <Link
                  className={`btn btn-sm px-3 py-2 rounded-3 fw-semibold ${
                    location.pathname === "/"
                      ? "btn-primary-custom"
                      : "btn-light text-dark"
                  }`}
                  to="/"
                  onClick={closeNav}
                >
                  Dashboard
                </Link>
                <Link
                  className={`btn btn-sm px-3 py-2 rounded-3 fw-semibold ${
                    location.pathname === "/add"
                      ? "btn-primary-custom"
                      : "btn-light text-dark"
                  }`}
                  to="/add"
                  onClick={closeNav}
                >
                  Add Transaction
                </Link>
                <Link
                  className={`btn btn-sm px-3 py-2 rounded-3 fw-semibold ${
                    location.pathname === "/stats"
                      ? "btn-primary-custom"
                      : "btn-light text-dark"
                  }`}
                  to="/stats"
                  onClick={closeNav}
                >
                  Statistics
                </Link>
              </div>

              <div className="d-flex mt-3 mt-lg-0 ms-lg-3 gap-2">
                <button
                  className="btn btn-sm btn-light border-0 rounded-3 p-2 d-none d-lg-flex align-items-center justify-content-center"
                  onClick={() => setDark(!dark)}
                  title="Toggle Dark Mode"
                  style={{ width: "38px", height: "38px" }}
                >
                  {dark ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.72" x2="5.64" y2="18.3"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  )}
                </button>

                <button
                  className="btn btn-sm btn-outline-danger border-0 rounded-3 p-2 d-flex align-items-center justify-content-center w-100 w-lg-auto"
                  onClick={() => { logout(); closeNav(); }}
                  title="Logout"
                  style={{ height: "38px", maxWidth: "120px" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="me-2 d-lg-none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="d-none d-lg-block"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  <span className="d-lg-none fw-bold">Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="ms-auto d-none d-lg-block">
              <button
                className="btn btn-sm btn-light border-0 rounded-3 p-2 d-flex align-items-center justify-content-center"
                onClick={() => setDark(!dark)}
                style={{ width: "38px", height: "38px" }}
              >
                {dark ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.72" x2="5.64" y2="18.3"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
