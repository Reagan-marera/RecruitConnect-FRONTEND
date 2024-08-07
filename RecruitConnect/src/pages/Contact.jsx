import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './contact.css'; // Import the CSS file

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('Your message has been sent. We will get back to you soon!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Us</h1>
      </header>

      <section className="contact-info">
        <div className="contact-details">
          <h2>Get in Touch</h2>
          <p>
            We’re here to help with any questions you may have. Please reach out through any of the methods below.
          </p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:info@recruitconnect.com">info@recruitconnect.com</a></li>
            <li><strong>Phone:</strong> <a href="tel:+1234567890">+123 456 7890</a></li>
            <li><strong>Address:</strong> 123 Career Lane, Suite 456, Jobtown, JT 78901</li>
          </ul>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Your Message"
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
          {formStatus && <p className="form-status">{formStatus}</p>}
        </div>
      </section>

      <footer className="contact-footer">
        <h2>Follow Us</h2>
        <div className="social-media-links">
          <a href="https://www.facebook.com/RecruitConnect" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.instagram.com/RecruitConnect" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com/company/recruitconnect" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
