import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Loginform.css";

const Seekerlogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkUserProfile = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token && location.pathname !== "/seeker-login") {
      navigate("/");
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    checkUserProfile();
  }, [checkUserProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        formData
      );
      localStorage.setItem("token", response.data.access_token);
      toast.success("Seeker logged in successfully!");
      navigate("/jobseeker");
    } catch (error) {
      setError(
        error.response?.data?.error || "Failed to login. Please try again."
      );
      toast.error(
        error.response?.data?.error || "Failed to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="login-header">Seeker Login</h2>
      {error && <p className="error-message">{error}</p>}
      <motion.form
        onSubmit={handleSubmit}
        className="login-form"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="login-input"
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        <motion.input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="login-input"
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        <motion.button
          type="submit"
          disabled={loading}
          className="login-button"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? "Submitting..." : "Login"}
        </motion.button>
      </motion.form>
      <Link to="/forgot-password" className="forgot-password-link">
        Forgot password?
      </Link>
    </motion.div>
  );
};

export default Seekerlogin;
