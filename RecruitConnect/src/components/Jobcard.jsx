import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../jobcard.css';

const JobCard = ({ job, onClick, detailed }) => {
  const [employerName, setEmployerName] = useState('');

  useEffect(() => {
    const fetchEmployerName = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/employers/${job.employer_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employer name');
        }

        const data = await response.json();
        setEmployerName(data.name);
      } catch (error) {
        console.error('Error fetching employer name:', error);
      }
    };

    fetchEmployerName();
  }, [job.employer_id]);

  return (
    <div className={`job-card ${detailed ? 'detailed' : ''}`} onClick={onClick}>
      <h2>{job.title}</h2>
      <p><strong>Employer:</strong> {employerName}</p>
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
