import React from 'react';
import './Application.css'; 
import { useNavigate } from 'react-router-dom';

const Application = () => {
  const navigate = useNavigate();

  const handleFindJobClick = () =>{
    navigate('/joblist');
  }
  return (
    <div className="card">
      <div className="card-header">
        Application page.
      </div>
      <div className="card-body">
        <p>You do not have any job applications yet</p>
        <button className="find-job-button" onClick={handleFindJobClick}>Find Dream Job</button>
      </div>
    </div>
  );
};

export default Application;
