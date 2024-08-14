import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../JobPostingForm.css';

const JobPostingForm = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [employerId, setEmployerId] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/jobs',
                {
                    title: jobTitle,
                    description: description,
                    location: location,
                    company_email: companyEmail,
                    employer_id: employerId,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setSuccessMessage('Job posted successfully!');
            setError(null);
            navigate('/employer-dashboard');

        } catch (error) {
            console.error('Error posting job:', error);
            if (error.response) {
                console.error('Error response status:', error.response.status);
                console.error('Error response data:', error.response.data);
                setError(error.response.data.message || 'Failed to post job. Please try again.');
            } else if (error.request) {
                console.error('Error request:', error.request);
                setError('No response from the server. Please try again.');
            } else {
                console.error('Error message:', error.message);
                setError('An unexpected error occurred. Please try again.');
            }
            setSuccessMessage(null);
        }
    };

    return (
        <form className="job-posting-form" onSubmit={handleSubmit}>
            <label>Job Title</label>
            <input 
                className="job-posting-form__input"
                type="text" 
                value={jobTitle} 
                onChange={(e) => setJobTitle(e.target.value)} 
                required 
            />

            <label>Description</label>
            <textarea 
                className="job-posting-form__textarea"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
            />

            <label>Location</label>
            <input 
                className="job-posting-form__input"
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                required 
            />

            <label>Company Email</label>
            <input 
                className="job-posting-form__input"
                type="email" 
                value={companyEmail} 
                onChange={(e) => setCompanyEmail(e.target.value)} 
                required 
            />

            <label>Employer ID</label>
            <input 
                className="job-posting-form__input"
                value={employerId} 
                onChange={(e) => setEmployerId(e.target.value)} 
                required 
            />

            <button 
                className="job-posting-form__button"
                type="submit"
            >
                Post Job
            </button>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
    );
};

export default JobPostingForm;