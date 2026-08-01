import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const submit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }

    const result = login(email);
    if (result.success) {
      navigate("/");
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="card glass-panel auth-card fade-in">
      <div className="text-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary mb-2"
        >
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
        <h3 className="fw-extrabold m-0" style={{ color: "var(--text-main)" }}>
          Sign In
        </h3>
        <p className="text-muted mt-1 small">Access your SpendWise dashboard</p>
      </div>

      {errorMsg && (
        <div
          className="alert alert-danger py-2 px-3 small border-0 rounded-3 mb-3"
          style={{ fontSize: "0.8rem" }}
        >
          {errorMsg}
        </div>
      )}

      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label fw-semibold text-muted" style={{ fontSize: "0.85rem" }}>
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary-custom w-100 py-2 fs-6 fw-bold mt-2">
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-muted small mb-0">
        New to SpendWise?{" "}
        <Link to="/register" className="text-primary fw-bold">
          Register here
        </Link>
      </p>
    </div>
  );
}
