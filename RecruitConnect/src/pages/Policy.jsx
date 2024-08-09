import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import './policy.css'; // Import the CSS file

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <header className="privacy-header">
        <FaShieldAlt size={48} color="#0078D4" />
        <h1>Privacy Policy</h1>
      </header>
      <main className="privacy-content">
        <section className="privacy-section">
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains how RecruitConnect collects, uses, and protects your personal information. By using our services, you consent to the practices described in this policy.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Information We Collect</h2>
          <p>
            We collect personal information that you provide directly to us, such as your name, email address, and job preferences.
          </p>
        </section>

        <section className="privacy-section">
          <h2>3. How We Use Your Information</h2>
          <p>
            We use your information to provide and improve our services, communicate with you, and ensure the security of our platform.
          </p>
        </section>

        <section className="privacy-section">
          <h2>4. Data Protection</h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. You can also opt out of receiving marketing communications from us.
          </p>
        </section>

        <section className="privacy-section">
          <h2>6. Changes to Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify users of significant changes through our website.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@recruitconnect.com">privacy@recruitconnect.com</a>.
          </p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
