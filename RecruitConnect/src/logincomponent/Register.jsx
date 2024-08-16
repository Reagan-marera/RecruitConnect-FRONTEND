import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role
    company_name: "",
    contact_email: "",
    company_culture: "",
    job_openings: "",
    address: "",
    phone_number: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      setFormData(prevState => ({
        ...prevState,
        password: "",
        confirmPassword: "",
      }));
      setLoading(false);
      return;
    }

    try {
      await axios.post("https://recruitconnect-backend-mlpw.onrender.com/register", formData);
      toast.success("Registration successful! Please login.");
      // Redirect based on user role
      if (formData.role === "user") {
        navigate("/seeker-login");
      } else if (formData.role === "employer") {
        navigate("/employer-login");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Failed to register. Please try again.");
      toast.error(error.response?.data?.error || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="register-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Register
      </motion.h2>
      {error && (
        <motion.p
          className="register-error-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      )}
      <motion.form
        onSubmit={handleSubmit}
        className="register-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="register-input"
          whileFocus={{ scale: 1.05 }}
          whileHover={{ scale: 1.05 }}
        />
        <motion.input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="register-input"
          whileFocus={{ scale: 1.05 }}
          whileHover={{ scale: 1.05 }}
        />
        <motion.input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="register-input"
          whileFocus={{ scale: 1.05 }}
          whileHover={{ scale: 1.05 }}
        />
        <motion.input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="register-input"
          whileFocus={{ scale: 1.05 }}
          whileHover={{ scale: 1.05 }}
        />
        <motion.select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="register-input"
          whileFocus={{ scale: 1.05 }}
          whileHover={{ scale: 1.05 }}
        >
          <option value="user">Job Seeker</option>
          <option value="employer">Employer</option>
        </motion.select>
        {formData.role === "employer" && (
          <>
            <motion.input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              className="register-input"
            />
            <motion.input
              type="email"
              name="contact_email"
              placeholder="Contact Email"
              value={formData.contact_email}
              onChange={handleChange}
              className="register-input"
            />
            <motion.input
              type="text"
              name="company_culture"
              placeholder="Company Culture"
              value={formData.company_culture}
              onChange={handleChange}
              className="register-input"
            />
            <motion.input
              type="text"
              name="job_openings"
              placeholder="Job Openings"
              value={formData.job_openings}
              onChange={handleChange}
              className="register-input"
            />
            <motion.input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="register-input"
            />
            <motion.input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              className="register-input"
            />
          </>
        )}
        <motion.button
          type="submit"
          disabled={loading}
          className="register-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Submitting..." : "Register"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Register;
