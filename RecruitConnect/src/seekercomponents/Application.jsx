import React from 'react';
import './Application.css'; 
import { useNavigate } from 'react-router-dom';
import image from './images/image.png'


const Application = () => {
  const navigate = useNavigate();

  const handleFindJobClick = () => {
    navigate('/joblist');
  }

  return (
    <div className="application-container">
      <div className="application-header">
        <code>Application page.</code>
      </div>
      <div className="application-body">
        <p className="application-info">
          Welcome to Recruit Connect your job application tracker! Here you can manage all your job applications in one place.
        </p>
        <p className="application-info">
          Ready to start your job search? Click the button below to explore the latest job opportunities tailored just for you.
        </p>
        <button className="find-job-button" onClick={handleFindJobClick}>Find Dream Job</button>
      </div>
         <img src={image} alt="Networking"/>  
    </div>
  );
};

export default Application;
