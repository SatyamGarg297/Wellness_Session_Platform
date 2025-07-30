import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import API from "../../services/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="login-input"
            name="email"
            type="email"
            placeholder="Email address"
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            className="login-input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        
        <button className="login-btn" type="submit">
          Sign In
        </button>
      </form>

      <div className="login-footer">
        Don't have an account?{" "}
        <Link to="/register" className="login-link">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;