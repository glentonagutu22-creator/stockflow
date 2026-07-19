import { useState } from "react";
import "./Login.css";
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await login(
      formData.email,
      formData.password
    );

    setLoading(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-header">
          <div className="logo-circle">
            <FaBoxOpen className="auth-logo" />
          </div>

          <h1>StockFlow</h1>

          <p>
            Sign in to manage your inventory and sales.
          </p>
        </div>

        <div className="auth-card">

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="password-box">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>
            </div>

            <div className="login-options">

              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <Link
                to="#"
                className="forgot-link"
              >
                Forgot Password?
              </Link>

            </div>

            <button
              className="login-btn"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

          </form>

          <div className="login-footer">
            <span>
              Don't have an account?
            </span>

            <Link to="/register">
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;