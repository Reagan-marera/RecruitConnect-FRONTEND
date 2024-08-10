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
