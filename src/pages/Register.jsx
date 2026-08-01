import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim()) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    const result = register(name, email);
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <polyline points="17 11 19 13 23 9"></polyline>
        </svg>
        <h3 className="fw-extrabold m-0" style={{ color: "var(--text-main)" }}>
          Create Account
        </h3>
        <p className="text-muted mt-1 small">Track and manage your expenses today</p>
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
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-muted small mb-0">
        Already registered?{" "}
        <Link to="/login" className="text-primary fw-bold">
          Sign In here
        </Link>
      </p>
    </div>
  );
}
