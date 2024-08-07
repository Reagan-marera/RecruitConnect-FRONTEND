import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const JobPostingEdit = () => {
  const [jobData, setJobData] = useState(null);
  const navigate = useNavigate();
  const { jobId } = useParams();

  useEffect(() => {
    // Simulate fetching job data (e.g., from local storage or hardcoded data)
    const fetchJobData = () => {
      const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
      const job = jobs.find(j => j.id === parseInt(jobId));
      if (job) {
        setJobData(job);
      } else {
        navigate('/jobs'); // Redirect if job not found
      }
    };

    fetchJobData();
  }, [jobId, navigate]);

  const handleUpdateJob = (updatedJob) => {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const updatedJobs = jobs.map(j => j.id === parseInt(jobId) ? updatedJob : j);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    navigate('/jobs'); 
  };

  return (
    <div>
      {jobData ? (
        <JobPostingForm initialData={jobData} onSubmit={handleUpdateJob} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JobPostingEdit;
