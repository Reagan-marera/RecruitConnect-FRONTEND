import React from 'react';
import './Application.css'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Application = () => {
  const navigate = useNavigate();
  

  const handleFindJobClick = () =>{
    toast("Wow, this is a toast notification!");
    navigate('/joblist');
  }
  return (
    <div className="card">
      <div className="card-header">
        Application page.
      </div>
      <div className="card-body">
        <button className="find-job-button" onClick={handleFindJobClick}>Find Dream Job</button>
      </div>
    </div>
  );
};

export default Application;
