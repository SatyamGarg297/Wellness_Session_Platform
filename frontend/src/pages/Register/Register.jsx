import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import API from "../../services/api";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage({ text: "", type: "" }); // Clear message when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await API.post("/auth/register", form);
      setMessage({ 
        text: "Registration successful! You can now login.", 
        type: "success" 
      });
      setForm({ email: "", password: "" }); // Clear form on success
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || "Registration failed", 
        type: "error" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create Account</h2>
      
      {message.text && (
        <div className={`${message.type}-message`}>
          {message.text}
        </div>
      )}

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="register-input"
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            className="register-input"
            name="password"
            type="password"
            placeholder="Create password"
            value={form.password}
            onChange={handleChange}
            required
            minLength="6"
          />
          <p className="password-hint">Minimum 6 characters</p>
        </div>
        
        <button 
          className="register-btn" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Register"}
        </button>
      </form>

      <div className="register-footer">
        Already have an account?{" "}
        <Link to="/login" className="register-link">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;