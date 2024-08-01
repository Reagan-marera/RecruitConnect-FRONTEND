import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Employerlogin.css";

const Employerlogin = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    contact_email: "",
    address: "",
    phone_number: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/employers", formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      
      alert("Employer added successfully!");
      navigate("/"); 
    } catch (error) {
      setError(error.response?.data?.error || "Failed to add employer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employer-login-container">
      <h2 className="employer-login-header">Add Employer</h2>
      {error && <p className="employer-error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="employer-login-form">
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
        <button type="submit" disabled={loading} className="employer-login-button">
          {loading ? "Submitting..." : "Add Employer"}
        </button>
      </form>
    </div>
  );
};

export default Employerlogin;
