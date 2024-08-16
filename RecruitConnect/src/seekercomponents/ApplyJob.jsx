import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ApplyJob.css';

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: null,
    portfolio: null,
    portfolioLink: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    formDataToSend.append('job_id', jobId);

    const token = localStorage.getItem("token"); 

    try {
      const response = await fetch('https://recruitconnect-backend-mlpw.onrender.com/applications', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      alert('Application submitted successfully!');
      navigate('/jobseeker/ApplicationsList'); // Navigate to the ApplicationsList page
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting your application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-job-form">
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="resume">Upload Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
            required
          />
        </div>

        <div>
          <label htmlFor="coverLetter">Cover Letter (Optional)</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter || ''}
            onChange={handleChange}
            placeholder="Paste your cover letter here or upload below."
          />
          <input
            type="file"
            id="coverLetterFile"
            name="coverLetter"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
          />
        </div>

        <div>
          <label htmlFor="portfolio">Portfolio (Optional)</label>
          <input
            type="file"
            id="portfolio"
            name="portfolio"
            onChange={handleChange}
            accept=".pdf,.doc,.docx,.zip,.rar"
          />
          <input
            type="url"
            id="portfolioLink"
            name="portfolioLink"
            placeholder="Or provide a link to your portfolio"
            value={formData.portfolioLink}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;
