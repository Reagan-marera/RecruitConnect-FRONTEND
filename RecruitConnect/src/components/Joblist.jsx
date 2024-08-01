import React, { useEffect, useState } from 'react';
import JobCard from './Jobcard';
import '../joblist.css';

const Joblist = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/jobs', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('An error occurred while fetching jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleBackClick = () => {
    setSelectedJob(null);
  };

  return (
    <div className="job-list">
      {loading && <p>Loading jobs...</p>}
      {error && <p>{error}</p>}
      {selectedJob ? (
        <div className="job-details">
          <button onClick={handleBackClick}>Back to job list</button>
          <JobCard job={selectedJob} detailed />
        </div>
      ) : (
        jobs.map(job => (
          <JobCard key={job.id} job={job} onClick={() => handleJobClick(job)} />
        ))
      )}
    </div>
  );
};

export default Joblist;
