import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../applications.css";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/employer/applications",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        setError(
          "An error occurred while fetching applications. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="applications">
      {loading && <p>Loading applications...</p>}
      {error && <p>{error}</p>}
      {applications.map((application) => (
        <motion.div
          className="application-card"
          key={application.id}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <h3>{application.applicantName}</h3>
          <p>Job Title: {application.jobTitle}</p>
          <p>
            Application Date:{" "}
            {new Date(application.applicationDate).toLocaleDateString()}
          </p>
          <p>Status: {application.status}</p>
          <button>View Resume</button>
          <button>Contact Applicant</button>
          <button>Reject Application</button>
        </motion.div>
      ))}
    </div>
  );
};

export default Applications;
