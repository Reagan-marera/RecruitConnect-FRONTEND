import React from 'react';
import './Application.css'; 

const Application = () => {
  return (
    <div className="card">
      <div className="card-header">
        Application page.
      </div>
      <div className="card-body">
        <p>You do not have any job applications yet</p>
        <button className="find-job-button" onClick={() => alert("Find your dream job")}>Find Dream Job</button>
      </div>
    </div>
  );
};

export default Application;
