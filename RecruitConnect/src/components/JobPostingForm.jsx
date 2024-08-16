import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../JobPostingForm.css';

const JobPostingForm = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [companyEmail, setCompanyEmail] = useState(''); 
    const [benefits, setBenefits] = useState(''); 
    const [responsibilities, setResponsibilities] = useState(''); 
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post('https://recruitconnect-backend-mlpw.onrender.com/refresh', { token: refreshToken });
            localStorage.setItem('token', response.data.accessToken);
            return response.data.accessToken;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                'https://recruitconnect-backend-mlpw.onrender.com/jobs',
                {
                    title: jobTitle,
                    description: description,
                    location: location,
                    company_email: companyEmail,
                    benefits: benefits,
                    responsibilities: responsibilities,
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
            if (error.response && error.response.status === 401 && error.response.data.msg === 'Token has expired') {
                token = await refreshAccessToken();
                if (token) {
                    handleSubmit(e); // Retry with the new token
                } else {
                    setError('Your session has expired. Please log in again.');
                    navigate('/login');
                }
            } else {
                console.error('Error posting job:', error);
                if (error.response) {
                    setError(error.response.data.message || 'Failed to post job. Please try again.');
                } else if (error.request) {
                    setError('No response from the server. Please try again.');
                } else {
                    setError('An unexpected error occurred. Please try again.');
                }
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

            <label>Benefits</label>
            <input
                className="job-posting-form__input"
                type="text"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                required
            />

            <label>Responsibilities</label>
            <input
                className="job-posting-form__input"
                type="text"
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
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
