import React from 'react';
import '../jobcard.css';
import { FaSave, FaArrowRight } from 'react-icons/fa'; // Add this import for icons

const JobCard = ({ job, onClick, detailed }) => {
  const handleSave = () => {
    // Add logic to save the job, e.g., making a POST request to a certain route
    fetch('/api/save-job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobId: job.id }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Job saved:', data);
      })
      .catch(error => {
        console.error('Error saving job:', error);
      });
  };

  const handleApply = () => {
    // Redirect to apply job route
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
