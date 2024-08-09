// import React, { useState } from 'react';
// // import './HelpCenter.css';

// const HelpCenter = () => {
//   const [activeSection, setActiveSection] = useState(null);

//   const toggleSection = (section) => {
//     setActiveSection(activeSection === section ? null : section);
//   };

//   return (
//     <div className="help-center">
//       <h1>Employer Dashboard Help Center</h1>
//       <p>Welcome to the Employer Dashboard Help Center. Here you'll find answers to common questions and guidance on how to use our platform effectively.</p>
//       <div className="toc-container">
//         <h2>Table of Contents</h2>
//         <ul className="toc-list">
//           <li onClick={() => toggleSection('gettingStarted')}>Getting Started</li>
//           <li onClick={() => toggleSection('managingJobPostings')}>Managing Job Postings</li>
//           <li onClick={() => toggleSection('reviewingApplications')}>Reviewing Applications</li>
//           <li onClick={() => toggleSection('communicatingWithCandidates')}>Communicating with Candidates</li>
//           <li onClick={() => toggleSection('accountSettings')}>Account Settings</li>
//           <li onClick={() => toggleSection('billingAndSubscriptions')}>Billing and Subscriptions</li>
//           <li onClick={() => toggleSection('troubleshooting')}>Troubleshooting</li>
//         </ul>
//       </div>

//       <div className="content-container">
//         {activeSection === 'gettingStarted' && (
//           <section>
//             <h3>Getting Started</h3>
//             <p><strong>How do I create an employer account?</strong></p>
//             <p>To create an employer account, click on the "Sign Up" button on the homepage and select "Employer." Follow the prompts to enter your company information and verify your email address.</p>
//             <p><strong>What information do I need to set up my company profile?</strong></p>
//             <p>You'll need your company name, logo, industry, company size, and a brief description. You can also add links to your company website and social media profiles.</p>
//           </section>
//         )}
//         {activeSection === 'managingJobPostings' && (
//           <section>
//             <h3>Managing Job Postings</h3>
//             <p><strong>How do I create a new job posting?</strong></p>
//             <p>From your dashboard, click on "Post a New Job." Fill in the job details, including title, description, requirements, and application instructions. You can also set screening questions and application deadlines.</p>
//             <p><strong>Can I edit a job posting after it's live?</strong></p>
//             <p>Yes, you can edit job postings at any time. Go to "Manage Jobs" in your dashboard, find the job you want to edit, and click "Edit." Remember that significant changes might reset your posting's visibility in search results.</p>
//           </section>
//         )}
//         {activeSection === 'reviewingApplications' && (
//           <section>
//             <h3>Reviewing Applications</h3>
//             <p><strong>Where can I see all the applications for a job?</strong></p>
//             <p>In your dashboard, go to "Manage Jobs" and click on the specific job title. You'll see a list of all applicants, which you can sort and filter as needed.</p>
//             <p><strong>How do I move candidates through the hiring pipeline?</strong></p>
//             <p>You can change a candidate's status (e.g., "Under Review," "Interview," "Offer Extended") from their application page. This helps you track where each candidate is in your hiring process.</p>
//           </section>
//         )}
//         {activeSection === 'communicatingWithCandidates' && (
//           <section>
//             <h3>Communicating with Candidates</h3>
//             <p><strong>Can I message candidates directly through the platform?</strong></p>
//             <p>Yes, you can send messages to candidates from their application page. This keeps all communication in one place and maintains a record of your interactions.</p>
//             <p><strong>How do I schedule interviews with candidates?</strong></p>
//             <p>You can use our integrated scheduling tool to propose interview times to candidates. Go to the candidate's profile and click "Schedule Interview" to access this feature.</p>
//           </section>
//         )}
//         {activeSection === 'accountSettings' && (
//           <section>
//             <h3>Account Settings</h3>
//             <p><strong>How do I update my company information?</strong></p>
//             <p>Go to "Account Settings" in your dashboard. Here you can update your company profile, change your password, and manage notification preferences.</p>
//             <p><strong>Can I add team members to my account?</strong></p>
//             <p>Yes, you can add team members with different levels of access. Go to "Team Management" in your settings to invite new members and set their permissions.</p>
//           </section>
//         )}
//         {activeSection === 'billingAndSubscriptions' && (
//           <section>
//             <h3>Billing and Subscriptions</h3>
//             <p><strong>What subscription plans do you offer?</strong></p>
//             <p>We offer several plans tailored to different company sizes and hiring needs. Visit our "Pricing" page for current options and features.</p>
//             <p><strong>How do I upgrade or downgrade my subscription?</strong></p>
//             <p>In your dashboard, go to "Billing" and select "Change Plan." You can compare plans and make changes there. Changes typically take effect at the start of your next billing cycle.</p>
//           </section>
//         )}
//         {activeSection === 'troubleshooting' && (
//           <section>
//             <h3>Troubleshooting</h3>
//             <p><strong>I can't log in to my account. What should I do?</strong></p>
//             <p>First, ensure you're using the correct email address and password. If you've forgotten your password, use the "Forgot Password" link on the login page. If you're still having trouble, contact our support team.</p>
//             <p><strong>The site isn't loading properly. How can I fix this?</strong></p>
//             <p>Try clearing your browser cache and cookies. If the problem persists, try using a different browser or device. If issues continue, please contact our technical support team.</p>
//           </section>
//         )}
//       </div>

//       <p className="support-contact">For any questions not covered here, please contact our support team at <a href="mailto:support@jobapp.com">support@jobapp.com</a> or use the live chat feature in your dashboard. We're here to help!</p>
//     </div>
//   );
// };

// export default HelpCenter;




import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import "./HelpCenter.css";

const HelpCenter = () => {
  const [activeSection, setActiveSection] = useState("");

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  const sections = [
    {
      id: "gettingStarted",
      title: "Getting Started",
      content: (
        <>
          <h3>Getting Started</h3>
          <p>
            <strong>How do I create an employer account?</strong>
          </p>
          <p>
            To create an employer account, click on the "Register" button on the
            homepage and select "Employer." Follow the prompts to enter your
            company information and verify your email address.
          </p>
          <p>
            <strong>
              What information do I need to set up my company profile?
            </strong>
          </p>
          <p>
            You'll need your company name, company email,company culture,job opening,Address and a
            phone number.
          </p>
        </>
      ),
    },
    {
      id: "managingJobPostings",
      title: "Managing Job Postings",
      content: (
        <>
          <h3>Managing Job Postings</h3>
          <p>
            <strong>How do I create a new job posting?</strong>
          </p>
          <p>
            From your dashboard, click on "Post a New Job." Fill in the job
            details, including title, description, requirements, and application
            instructions. You can also set screening questions and application
            deadlines.
          </p>
          <p>
            <strong>Can I edit a job posting after it's live?</strong>
          </p>
          <p>
            Yes, you can edit job postings at any time. Go to "Manage Jobs" in
            your dashboard, find the job you want to edit, and click "Edit."
            Remember that significant changes might reset your posting's
            visibility in search results.
          </p>
        </>
      ),
    },
    {
      id: "reviewingApplications",
      title: "Reviewing Applications",
      content: (
        <>
          <h3>Reviewing Applications</h3>
          <p>
            <strong>Where can I see all the applications for a job?</strong>
          </p>
          <p>
            In your dashboard, go to "Manage Jobs" and click on the specific job
            title. You'll see a list of all applicants, which you can sort and
            filter as needed.
          </p>
          <p>
            <strong>
              How do I move candidates through the hiring pipeline?
            </strong>
          </p>
          <p>
            You can change a candidate's status (e.g., "Under Review,"
            "Interview," "Offer Extended") from their application page. This
            helps you track where each candidate is in your hiring process.
          </p>
        </>
      ),
    },
    {
      id: "communicatingWithCandidates",
      title: "Communicating with Candidates",
      content: (
        <>
          <h3>Communicating with Candidates</h3>
          <p>
            <strong>
              Can I message candidates directly through the platform?
            </strong>
          </p>
          <p>
            Yes, you can send messages to candidates from their application
            page. This keeps all communication in one place and maintains a
            record of your interactions.
          </p>
          <p>
            <strong>How do I schedule interviews with candidates?</strong>
          </p>
          <p>
            You can use our integrated scheduling tool to propose interview
            times to candidates. Go to the candidate's profile and click
            "Schedule Interview" to access this feature.
          </p>
        </>
      ),
    },

    // Add more sections as needed
  ];

  return (
    <div className="help-center">
      {/* <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Employer Dashboard Help Center
      </motion.h1> */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Welcome to the  Help Center. Here you'll find answers
        to common questions and guidance on how to use our platform effectively.
      </motion.p>
      <motion.div
        className="toc-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2>Table of Contents</h2>
        <motion.ul
          className="toc-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
        >
          {sections.map((section, index) => (
            <motion.li
              key={index}
              onClick={() => toggleSection(section.id)}
              whileHover={{ scale: 1.05, backgroundColor: "#e7f3ff" }}
              whileTap={{ scale: 0.95 }}
            >
              {section.title}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <div className="content-container">
        <AnimatePresence>
          {sections.map((section) =>
            activeSection === section.id ? (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                {section.content}
              </motion.section>
            ) : null
          )}
        </AnimatePresence>
      </div>

      <motion.p
        className="support-contact"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        For any questions not covered here, please contact our support team at{" "}
        <a href="mailto:support@jobapp.com">recruitconnect.com</a> 

      </motion.p>
    </div>
  );
};

export default HelpCenter;
