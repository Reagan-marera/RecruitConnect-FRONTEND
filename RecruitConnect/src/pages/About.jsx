import React from 'react';
import './about.css'; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About RecruitConnect</h1>
      </header>

      <section className="about-content">
        <div className="about-image">
          <img src="https://media.istockphoto.com/id/1418476287/photo/businessman-analyzing-companys-financial-balance-sheet-working-with-digital-augmented-reality.jpg?s=1024x1024&w=is&k=20&c=5XJmAncylGHolXBNv72I92Cttvaq7eGhpckgjHz34V4=" alt="Businessman analyzing data" />
        </div>

        <div className="about-text">
          <div className="about-mission">
            <h2>Our Mission</h2>
            <p>
              At RecruitConnect, our mission is to bridge the gap between talented job seekers and leading employers. 
              We strive to streamline the job application process and provide a seamless experience for both job seekers and employers. 
              We are committed to empowering individuals by offering the tools and opportunities they need to excel in their careers.
            </p>
          </div>

          <div className="about-what-we-do">
            <h2>What We Do</h2>
            <p>
              RecruitConnect offers a comprehensive platform where job seekers can explore a wide range of opportunities, 
              apply for positions, and track their applications effortlessly. Employers can post job listings, search for qualified candidates, 
              and manage their recruitment process efficiently. Our advanced search functionality, detailed job listings, and applicant tracking system 
              ensure that both job seekers and employers have access to the best tools for successful recruitment.
            </p>
          </div>
        </div>

        <div className="about-data">
          <h2>Impact by the Numbers</h2>
          <div className="data-section">
            <div className="data-item">
              <div className="data-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 text-teal-500"><path d="M12 2a10 10 0 00-10 10v7a1 1 0 001 1h18a1 1 0 001-1v-7a10 10 0 00-10-10zM4 12a8 8 0 0116 0v6H4v-6zm8 4a1.5 1.5 0 01-1.5-1.5V14a1.5 1.5 0 013 0v.5A1.5 1.5 0 0112 16z"/></svg>
              </div>
              <div className="data-info">
                <h3 className="data-title">Successful Placements</h3>
                <p className="data-value">20% of job seekers successfully placed.</p>
              </div>
            </div>

            <div className="data-item">
              <div className="data-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 text-teal-500"><path d="M19.293 9.293a1 1 0 00-1.414 0L12 14.586 9.121 11.707a1 1 0 00-1.414 1.414l3.5 3.5a1 1 0 001.414 0l6-6a1 1 0 000-1.414z"/></svg>
              </div>
              <div className="data-info">
                <h3 className="data-title">Company Success Rates</h3>
                <p className="data-value">85% success rate for companies using RecruitConnect.</p>
              </div>
            </div>
          </div>

          <div className="charts">
            <div className="chart-card">
              <h3>Job Placement Success Rates</h3>
              <div className="chart">
                <svg viewBox="0 0 100 100" className="circle-chart">
                  <circle cx="50" cy="50" r="45" stroke="#e0f7fa" strokeWidth="10" fill="none"/>
                  <circle cx="50" cy="50" r="45" stroke="#1e3a8a" strokeWidth="10" fill="none" strokeDasharray="20 80"/>
                </svg>
                <div className="chart-text">
                  <span className="percentage">20%</span>
                  <span className="label">Successful Placements</span>
                </div>
              </div>
            </div>

            <div className="chart-card">
              <h3>Company Success Rates</h3>
              <div className="chart">
                <svg viewBox="0 0 100 100" className="circle-chart">
                  <circle cx="50" cy="50" r="45" stroke="#e0f7fa" strokeWidth="10" fill="none"/>
                  <circle cx="50" cy="50" r="45" stroke="#1e3a8a" strokeWidth="10" fill="none" strokeDasharray="85 15"/>
                </svg>
                <div className="chart-text">
                  <span className="percentage">85%</span>
                  <span className="label">Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="about-footer">
        <p>
          For more information, visit our <a href="/contact">Contact</a> page or reach out to us directly. 
          We look forward to helping you achieve your career goals or find the ideal candidate for your organization.
        </p>
      </footer>
    </div>
  );
};

export default About;
