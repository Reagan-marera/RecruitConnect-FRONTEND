import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Seekerlogin.css"; 

const Seekerlogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = isLogin
        ? "http://127.0.0.1:5000/login"
        : "http://127.0.0.1:5000/register";
      const response = await axios.post(url, formData);

      if (isLogin) {
        // Save the JWT token in local storage or context
        localStorage.setItem("token", response.data.access_token);
        // Redirect to the home page
        navigate("/");
      } else {
        // Registration success
        setShowModal(true);
        setIsLogin(true); // Switch to login form
        setFormData({ username: "", email: "", password: "" }); // Clear form fields
      }
    } catch (error) {
      if (isLogin) {
        // Handle login specific error
        setError("User not found. Please register.");
      } else {
        // Handle registration error
        setError(error.response?.data?.error || "Failed to register. Please try again.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seeker-login-page">
      <div className="seeker-login-container">
        <h2>{isLogin ? "Job-Seeker Login" : "Job-Seeker Register"}</h2>
        {error && <p className="seeker-error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="seeker-form-field">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="seeker-login-input"
                required
              />
            </div>
          )}
          <div className="seeker-form-field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="seeker-login-input"
              required
            />
          </div>
          <div className="seeker-form-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="seeker-login-input"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="seeker-login-button seeker-btn-primary">
            {loading ? "Submitting..." : isLogin ? "Login" : "Register"}
          </button>
          <div className="seeker-switch-form">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="seeker-btn-link">
              {isLogin ? "Register" : "Login"}
            </button>
          </div>
        </form>
        {showModal && (
          <div className="seeker-modal">
            <div className="seeker-modal-content">
              <span className="seeker-close" onClick={() => setShowModal(false)}>&times;</span>
              <p>Registration success. Please log in.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seekerlogin;
