import React from "react";
import "../Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section company-info">
          <h4>RecruitConnect</h4>
          <p>Your bridge to career opportunities.</p>
          <p>&copy; 2024 RecruitConnect. All rights reserved.</p>
        </div>

        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/jobs">Jobs</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h4>Contact Us</h4>
          <p>Email: support@recruitconnect.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 1234 Recruitment Lane, Jobsville, JS 12345</p>
        </div>

        <div className="footer-section social-media">
          <h4>Follow Us</h4>
          <a
            href="https://facebook.com/recruitconnect"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com/recruitconnect"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com/company/recruitconnect"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 RecruitConnect. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
