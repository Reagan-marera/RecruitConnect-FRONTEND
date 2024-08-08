// import React, { useState } from "react";
// import axios from "axios";

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "job-seeker",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = isLogin ? "/login" : "/register";
//     try {
//       const response = await axios.post(
//         `http://localhost:5000${url}`,
//         formData
//       );
//       localStorage.setItem("token", response.data.access_token);
//       // Redirect based on role
//       if (formData.role === "job-seeker") {
//         window.location.href = "/job-seeker-dashboard";
//       } else {
//         window.location.href = "/employer-dashboard";
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {!isLogin && (
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             name="username"
//             onChange={handleChange}
//             value={formData.username}
//           />
//         </div>
//       )}
//       <div>
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           onChange={handleChange}
//           value={formData.email}
//         />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           onChange={handleChange}
//           value={formData.password}
//         />
//       </div>
//       {!isLogin && (
//         <div>
//           <label>Role:</label>
//           <select name="role" onChange={handleChange} value={formData.role}>
//             <option value="job-seeker">Job Seeker</option>
//             <option value="employer">Employer</option>
//           </select>
//         </div>
//       )}
//       <button type="submit">{isLogin ? "Login" : "Register"}</button>
//       <button type="button" onClick={() => setIsLogin(!isLogin)}>
//         {isLogin ? "Switch to Register" : "Switch to Login"}
//       </button>
//     </form>
//   );
// };

// export default Auth;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import "../AuthForm.css";

// const AuthForm = ({ isEmployer }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     company_name: "",
//     contact_email: "",
//     address: "",
//     phone_number: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname.includes("signup")) {
//       setIsLogin(false);
//     } else {
//       setIsLogin(true);
//     }
//   }, [location.pathname]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const url = isLogin
//         ? `http://127.0.0.1:5000/${isEmployer ? "employers/login" : "login"}`
//         : `http://127.0.0.1:5000/${isEmployer ? "employers" : "register"}`;
//       const response = await axios.post(url, formData);

//       if (isLogin) {
//         localStorage.setItem("token", response.data.access_token);
//         navigate("/");
//       } else {
//         setShowModal(true);
//         setIsLogin(true);
//         setFormData({
//           username: "",
//           email: "",
//           password: "",
//           company_name: "",
//           contact_email: "",
//           address: "",
//           phone_number: "",
//         });
//       }
//     } catch (error) {
//       setError(
//         error.response?.data?.error || "Request failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-form-container">
//       <h2>
//         {isLogin
//           ? isEmployer
//             ? "Employer Login"
//             : "Job-Seeker Login"
//           : isEmployer
//           ? "Add Employer"
//           : "Job-Seeker Register"}
//       </h2>
//       {error && <p className="auth-error-message">{error}</p>}
//       <form onSubmit={handleSubmit} className="auth-form">
//         {!isLogin && !isEmployer && (
//           <div className="auth-form-field">
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="auth-input"
//             />
//           </div>
//         )}
//         {isEmployer && !isLogin && (
//           <>
//             <input
//               type="text"
//               name="company_name"
//               placeholder="Company Name"
//               value={formData.company_name}
//               onChange={handleChange}
//               required
//               className="auth-input"
//             />
//             <input
//               type="email"
//               name="contact_email"
//               placeholder="Contact Email"
//               value={formData.contact_email}
//               onChange={handleChange}
//               required
//               className="auth-input"
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//               className="auth-input"
//             />
//             <input
//               type="text"
//               name="phone_number"
//               placeholder="Phone Number"
//               value={formData.phone_number}
//               onChange={handleChange}
//               className="auth-input"
//             />
//           </>
//         )}
//         <div className="auth-form-field">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="auth-input"
//             required
//           />
//         </div>
//         <div className="auth-form-field">
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="auth-input"
//             required
//           />
//         </div>
//         <button type="submit" disabled={loading} className="auth-button">
//           {loading
//             ? "Submitting..."
//             : isLogin
//             ? isEmployer
//               ? "Login"
//               : "Login"
//             : isEmployer
//             ? "Add Employer"
//             : "Register"}
//         </button>
//         <div className="auth-switch-form">
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 isLogin
//                   ? isEmployer
//                     ? "/employer-signup"
//                     : "/seeker-signup"
//                   : isEmployer
//                   ? "/employer-login"
//                   : "/seeker-login"
//               )
//             }
//             className="auth-btn-link"
//           >
//             {isLogin ? "Register" : "Login"}
//           </button>
//         </div>
//       </form>
//       {showModal && !isLogin && (
//         <div className="auth-modal">
//           <div className="auth-modal-content">
//             <span className="auth-close" onClick={() => setShowModal(false)}>
//               &times;
//             </span>
//             <p>Registration success. Please log in.</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuthForm;









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
        ? `http://127.0.0.1:5000/${role}-login`
        : `http://127.0.0.1:5000/${role}-register`;

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
