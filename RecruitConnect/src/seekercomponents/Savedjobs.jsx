import React, { useEffect, useState } from 'react';
import axios from 'axios';


import Jobcard from '../components/Jobcard'; 
// import './SavedJobs.css'; 

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/saved_jobs', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setSavedJobs(response.data);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
        setError('An error occurred while fetching saved jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div className="saved-jobs-container">
      <h2>Saved Jobs</h2>
      {loading && <p>Loading saved jobs...</p>}
      {error && <p>{error}</p>}
      <div className="job-list">
        {savedJobs.map(job => (
          <Jobcard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;
