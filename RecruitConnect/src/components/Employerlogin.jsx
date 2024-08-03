import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", formData);
      const { access_token } = response.data;

      // Save the token in localStorage or state management
      localStorage.setItem("token", access_token);

      // Decode token to get user role (assuming a JWT library is used)
      const decodedToken = JSON.parse(atob(access_token.split('.')[1]));
      const role = decodedToken.role;

      // Redirect based on user role
      if (role === "user") {
        navigate("/seeker-dashboard");
      } else if (role === "employer") {
        navigate("/employer-dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      {error && <p className="login-error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="login-input"
        />
        <button type="submit" disabled={loading} className="login-button">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
