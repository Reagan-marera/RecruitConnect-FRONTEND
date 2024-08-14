import React, { useState, useEffect } from "react";
import axios from "axios";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [employerId, setEmployerId] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    // Function to get the current user's details
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('employerAuthToken');
      if (token) {
        try {
          // Fetch user details
          const response = await axios.get('http://127.0.0.1:5000/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { employer_id } = response.data;
          setToken(token);
          setEmployerId(employer_id);
        } catch (error) {
          setError("Error fetching user details. Please try again later.");
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false); // Set loading to false regardless of success or failure
        }
      } else {
        setError("Authentication token not found. Please log in.");
        setLoading(false); // Ensure loading is stopped if token is not found
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    // Fetch job listings when employerId and token are available
    const fetchJobs = async () => {
      if (employerId && token) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:5000/jobs/${employerId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setJobs(response.data.jobs);
        } catch (error) {
          setError("Error fetching job listings. Please try again later.");
          console.error("Error fetching jobs:", error);
        }
      }
    };

    fetchJobs();
  }, [employerId, token]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ul>
          {jobs.map((job) => (
            <li key={job.id} className="mb-4 p-4 bg-white shadow rounded">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-700">{job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Posted:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
              <p><strong>Benefits:</strong> {job.benefits}</p> {/* Displaying benefits */}
              <p><strong>Responsibilities:</strong> {job.responsibilities}</p> {/* Displaying responsibilities */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobListings;
