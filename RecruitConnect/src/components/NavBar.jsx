import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../Navbar.css";
import LogoutButton from "./Logout";

const Navbar = () => {
  const [dropdown, setDropdown] = useState({
    login: false
  });
  const accessToken = localStorage.getItem('token');

  const toggleDropdown = (type) => {
    setDropdown((prev) => ({
      login: type === "login" ? !prev.login : false
    }));
  };

  const NavItem = ({ title, isOpen, toggle, children }) => (
    <div className="nav-item">
      <button onClick={toggle} className="nav-button">
        {title}
      </button>
      {isOpen && <div className="dropdown">{children}</div>}
    </div>
  );

  const DropdownItem = ({ to, children }) => (
    <Link to={to} className="dropdown-item">
      {children}
    </Link>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/logo1.png" alt="Logo" className="logo" />
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <NavItem
            title="Login"
            isOpen={dropdown.login}
            toggle={() => toggleDropdown("login")}
          >
            <DropdownItem to="/employer-login">As Employer</DropdownItem>
            <DropdownItem to="/seeker-login">As Job-Seeker</DropdownItem>
          </NavItem>

          <Link to="/register" className="nav-button">
            Register
          </Link>
          {accessToken && (
            <LogoutButton />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
