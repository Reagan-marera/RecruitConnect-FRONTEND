import React, { useState } from "react";
import "../Navbar.css";

const Navbar = () => {
  const [jobSeekerDropdown, setJobSeekerDropdown] = useState(false);
  const [employerDropdown, setEmployerDropdown] = useState(false);

  const toggleDropdown = (dropdownSetter) => {
    setJobSeekerDropdown(false);
    setEmployerDropdown(false);
    dropdownSetter((prev) => !prev);
  };

  const NavItem = ({ title, isOpen, toggle, children }) => (
    <div className="nav-item">
      <button onClick={toggle} className="nav-button">
        {title}
      </button>
      {isOpen && <div className="dropdown">{children}</div>}
    </div>
  );

  const DropdownItem = ({ href, children }) => (
    <a href={href} className="dropdown-item">
      {children}
    </a>
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
            isOpen={jobSeekerDropdown}
            toggle={() => toggleDropdown(setJobSeekerDropdown)}
          >
            <DropdownItem href="/login">Log In</DropdownItem>
            <DropdownItem href="/signup">Sign Up</DropdownItem>
          </NavItem>
          <NavItem
            title="Employer"
            isOpen={employerDropdown}
            toggle={() => toggleDropdown(setEmployerDropdown)}
          >
            <DropdownItem href="/login">Log In</DropdownItem>
            <DropdownItem href="/signup">Sign Up</DropdownItem>
          </NavItem>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


