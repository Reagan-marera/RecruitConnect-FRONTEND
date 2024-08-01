import React from 'react';
import '../jobcard.css';

const JobCard = ({ job, onClick, detailed }) => {
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
    </div>
  );
};

export default JobCard;
