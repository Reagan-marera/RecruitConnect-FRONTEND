import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Navbar.css";

const Navbar = () => {
  const [dropdown, setDropdown] = useState({
    jobSeeker: false,
    employer: false
  });

  const toggleDropdown = (type) => {
    setDropdown((prev) => ({
      jobSeeker: type === "jobSeeker" ? !prev.jobSeeker : false,
      employer: type === "employer" ? !prev.employer : false
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
          <img src="/path-to-your-logo.png" alt="Logo" className="logo" />
        </div>
        <div className="navbar-links">
          <NavItem
            title="Job-Seeker"
            isOpen={dropdown.jobSeeker}
            toggle={() => toggleDropdown("jobSeeker")}
          >
            <DropdownItem to="/seeker-login">Log In</DropdownItem>
            <DropdownItem to="/seeker-signup">Sign Up</DropdownItem>
          </NavItem>
          <NavItem
            title="Employer"
            isOpen={dropdown.employer}
            toggle={() => toggleDropdown("employer")}
          >
            <DropdownItem to="/employer-login">Log In</DropdownItem>
            <DropdownItem to="/employer-signup">Sign Up</DropdownItem>
          </NavItem>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
