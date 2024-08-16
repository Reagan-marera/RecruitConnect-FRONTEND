import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./  AuthForm.css";

const AuthForm = () => {
  const [role, setRole] = useState("job-seeker");
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    company_name: "",
    contact_email: "",
    address: "",
    phone_number: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
        ? `https://recruitconnect-backend-mlpw.onrender.com/${role}-login`
        : `https://recruitconnect-backend-mlpw.onrender.com/${role}-register`;

      const response = await axios.post(url, formData);
      if (isLogin) {
        localStorage.setItem("token", response.data.access_token);
        navigate(`/${role}-dashboard`);
      } else {
        setIsLogin(true);
        setFormData({
          username: "",
          email: "",
          password: "",
          company_name: "",
          contact_email: "",
          address: "",
          phone_number: "",
        });
      }
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="unified-form-container">
      <h2>{isLogin ? `Login as ${role}` : `Register as ${role}`}</h2>
      {error && <p className="unified-form-error">{error}</p>}
      <form onSubmit={handleSubmit} className="unified-form">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="role-selector"
        >
          <option value="job-seeker">Job-Seeker</option>
          <option value="employer">Employer</option>
        </select>

        {!isLogin && role === "job-seeker" && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        {!isLogin && role === "employer" && (
          <input
            type="text"
            name="company_name"
            placeholder="Company Name"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {!isLogin && role === "employer" && (
          <>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : isLogin ? "Login" : "Register"}
        </button>

        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>an 
      </form>
    </div>
  );
};

export default AuthForm;
