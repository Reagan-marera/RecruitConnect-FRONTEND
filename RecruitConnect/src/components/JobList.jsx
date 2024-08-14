import React, { useEffect, useState } from 'react';
import JobCard from './Jobcard';
import '../joblist.css';
import SearchBar from './Search';


const Joblist = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/jobs', {
        
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
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

  const handleSearch = ({ keywords, location, jobTitle }) => {
    const filtered = jobs.filter(job => {
      const keywordMatch = keywords ? job.title.toLowerCase().includes(keywords.toLowerCase()) : true;
      const locationMatch = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
      const titleMatch = jobTitle ? job.title.toLowerCase().includes(jobTitle.toLowerCase()) : true;
      return keywordMatch && locationMatch && titleMatch;
    });

    setFilteredJobs(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="job-list">
        {loading && <p>Loading jobs...</p>}
        {error && <p>{error}</p>}
        {selectedJob ? (
          <div className="job-details">
            <button onClick={handleBackClick}>Back to job list</button>
            <JobCard job={selectedJob} detailed />
          </div>
        ) : (
          filteredJobs.map(job => (
            <JobCard key={job.id} job={job} onClick={() => handleJobClick(job)} />
          ))
        )}
      </div>
    </div>
  );
};

export default Joblist;
