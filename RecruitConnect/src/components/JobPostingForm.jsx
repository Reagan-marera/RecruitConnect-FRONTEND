import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './JobPostingForm.css';

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    salary: '',
    jobType: '' 
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { jobId } = useParams(); 

  useEffect(() => {
    if (jobId) {
      const fetchJob = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://127.0.0.1:5000/api/jobs/${jobId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setFormData(response.data);
        } catch (err) {
          setError('Failed to fetch job details');
        }
      };
      fetchJob();
    }
  }, [jobId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      const url = jobId 
        ? `http://127.0.0.1:5000/api/jobs/${jobId}`
        : 'http://127.0.0.1:5000/api/jobs';
      const method = jobId ? 'put' : 'post';

      await axios({
        method,
        url,
        data: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setLoading(false);
      setSuccess(true);

      if (!jobId) {
        setFormData({
          jobTitle: '',
          company: '',
          location: '',
          description: '',
          requirements: '',
          salary: '',
          jobType: '' // Reset to default
        });
      }

      navigate('/jobs'); // Adjust the route as per your application's routing
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="job-posting-form">
      <h2>{jobId ? 'Edit Job' : 'Post a New Job'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jobTitle">Job Title:</label>
          <input 
            type="text" 
            id="jobTitle" 
            name="jobTitle" 
            value={formData.jobTitle} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="company">Company:</label>
          <input 
            type="text" 
            id="company" 
            name="company" 
            value={formData.company} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="description">Job Description:</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="requirements">Requirements:</label>
          <textarea 
            id="requirements" 
            name="requirements" 
            value={formData.requirements} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="salary">Salary:</label>
          <input 
            type="text" 
            id="salary" 
            name="salary" 
            value={formData.salary} 
            onChange={handleChange} 
          />
        </div>
        <div className="job-type">
          <label>Job Type:</label>
          <div className="job-type-options">
            <label>
              <input 
                type="radio" 
                name="jobType" 
                value="contract" 
                checked={formData.jobType === 'contract'} 
                onChange={handleChange} 
              />
              Contract
            </label>
            <label>
              <input 
                type="radio" 
                name="jobType" 
                value="part-time" 
                checked={formData.jobType === 'part-time'} 
                onChange={handleChange} 
              />
              Part-Time
            </label>
            <label>
              <input 
                type="radio" 
                name="jobType" 
                value="full-time" 
                checked={formData.jobType === 'full-time'} 
                onChange={handleChange} 
              />
              Full-Time
            </label>
          </div>
        </div>
        <button type="submit" disabled={loading}>
          {jobId ? 'Update Job' : 'Post Job'}
        </button>
        {loading && <p>Processing...</p>}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{jobId ? 'Job updated successfully!' : 'Job posted successfully!'}</p>}
      </form>
    </div>
  );
};

export default JobPostingForm;
