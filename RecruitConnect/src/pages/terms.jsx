import React from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import './terms.css'; // Import the CSS file

const TermsOfService = () => {
  return (
    <div className="terms-container">
      <header className="terms-header">
        <FaRegFileAlt size={48} color="#0078D4" />
        <h1>Terms of Service</h1>
      </header>
      <main className="terms-content">
        <section className="terms-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to RecruitConnect. These Terms of Service govern your use of our website and services. By using our services, you agree to these terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. User Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. Service Availability</h2>
          <p>
            We strive to provide uninterrupted service. However, we do not guarantee that our services will always be available or error-free.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Limitation of Liability</h2>
          <p>
            We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms of Service at any time. We will notify users of significant changes.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at <a href="mailto:support@recruitconnect.com">support@recruitconnect.com</a>.
          </p>
        </section>
      </main>
    </div>
  );
};

export default TermsOfService;
