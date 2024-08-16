import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApplicationsList.css'; 

const ApplicationsList = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem("token"); 
                if (!token) {
                    setError('No token found. Please log in.');
                    return;
                }

                const response = await axios.get('https://recruitconnect-backend-mlpw.onrender.com/applications/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setApplications(response.data.applications);
            } catch (err) {
                console.error('Error fetching applications:', err.response ? err.response.data : err.message);
                setError('Failed to fetch applications');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="applications-list">
            <h1>Your Applications</h1>
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <ul>
                    {applications.map((app) => (
                        <li key={app.id} className="application-item">
                            <h2>Job ID: {app.job_id}</h2>
                            <p>Cover Letter: {app.cover_letter === 'null' ? 'No cover letter provided' : app.cover_letter}</p>
                            <p>Status: {app.status}</p>
                            <p>
                                Resume: <a href={app.resume_url} target="_blank" rel="noopener noreferrer">View Resume</a>
                            </p>
                            {app.portfolio_url ? (
                                <p>
                                    Portfolio: <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer">View Portfolio</a>
                                </p>
                            ) : (
                                <p>No portfolio available</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ApplicationsList;
