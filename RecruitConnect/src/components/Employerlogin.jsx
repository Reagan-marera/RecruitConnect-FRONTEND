import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Employerlogin.css";

const Employerlogin = () => {
  const [isLogin, setIsLogin] = useState(true); // To toggle between login and signup
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    company_name: "",
    contact_email: "",
    address: "",
    phone_number: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && location.pathname !== "/employer-signup" && location.pathname !== "/employer-login") {
      setJwtToken(token);
      navigate("/"); // Redirect to home if token found and not on signup/login page
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    // Check the current path and set the form mode accordingly
    if (location.pathname === "/employer-signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isLogin ? "http://127.0.0.1:5000/login" : "http://127.0.0.1:5000/register";
      const response = await axios.post(url, {
        ...formData,
        role: isLogin ? undefined : "employer" // Ensure the role is set to employer during signup
      });

      if (isLogin) {
        localStorage.setItem("token", response.data.access_token);
        alert("Employer logged in successfully!");
        navigate("/"); // Redirect to home page
      } else {
        alert("Employer registered successfully!");
        navigate("/employer-login"); // Redirect to login page
      }
    } catch (error) {
      setError(error.response?.data?.error || `Failed to ${isLogin ? "login" : "register"} employer. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employer-login-container">
      <h2 className="employer-login-header">{isLogin ? "Employer Login" : "Employer Registration"}</h2>
      {error && <p className="employer-error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="employer-login-form">
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="employer-login-input"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="employer-login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="employer-login-input"
        />
        {!isLogin && (
          <>
            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="employer-login-input"
            />
            <input
              type="email"
              name="contact_email"
              placeholder="Contact Email"
              value={formData.contact_email}
              onChange={handleChange}
              required
              className="employer-login-input"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="employer-login-input"
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              className="employer-login-input"
            />
          </>
        )}
        <button type="submit" disabled={loading} className="employer-login-button employer-btn-primary">
          {loading ? "Submitting..." : isLogin ? "Login" : "Register"}
        </button>
      </form>
      <div className="employer-switch-form">
        {isLogin ? (
          <>
            Don't have an account? 
            <button type="button" onClick={() => navigate("/employer-signup")} className="employer-btn-link">
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account? 
            <button type="button" onClick={() => navigate("/employer-login")} className="employer-btn-link">
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Employerlogin;
