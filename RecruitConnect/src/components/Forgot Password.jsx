import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Loginform.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user role from backend or local storage
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Adjust according to your token storage
        const response = await axios.get("http://127.0.0.1:5000/get_user_role", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserRole(response.data.role);
      } catch (err) {
        setError('Unable to determine user role.');
      }
    };

    fetchUserRole();
  }, []);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken'); // Adjust according to your token storage
      await axios.post("http://127.0.0.1:5000/reset_password", { email, new_password: newPassword }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Redirect based on user role
      if (formData.role === "user") {
        navigate("/seeker-login");
      } else if (formData.role === "employer") {
        navigate("/employer-login");
      }  
      
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handlePasswordReset} className="forgot-password-form">
        <h2>Reset Password</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="input"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
          required
          className="input"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
          className="input"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
