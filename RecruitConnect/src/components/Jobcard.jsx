import React from 'react';
import '../jobcard.css';
import { FaSave, FaArrowRight } from 'react-icons/fa'; 
import axios from 'axios';

const JobCard = ({ job, onClick, detailed }) => {
  const handleSave = async (event) => {
    event.stopPropagation(); 

    const token = localStorage.getItem("token"); 
    if (!token) {
      console.error('No access token found');
      alert('Please log in to save jobs.');
      return;
    }

    try {
      const response = await axios.post(
        'https://recruitconnect-backend-mlpw.onrender.com/savejob',
        { job_id: job.id },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Job saved:', response.data);
    } catch (error) {
      console.error('Error saving job:', error.response ? error.response.data : error.message);
    }
  };

  const handleApply = () => {
    window.location.href = `/apply-job/${job.id}`;
  };

  return (
    <div className={`job-card ${detailed ? 'detailed' : ''}`} onClick={onClick}>
      <h2>{job.title}</h2>
      <p><strong>Company Email:</strong> {job.company_email}</p>
      <p><strong>Location:</strong> {job.location}</p>
      {detailed && (
        <>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Benefits:</strong> {job.benefits}</p>
          <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
          <p><strong>Posted at:</strong> {new Date(job.posted_at).toLocaleString()}</p>
        </>
      )}
      <div className="job-card-buttons">
        <button className="save-button" onClick={handleSave}>
          <FaSave /> Save
        </button>
        <button className="apply-button" onClick={handleApply}>
          <FaArrowRight /> Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;
