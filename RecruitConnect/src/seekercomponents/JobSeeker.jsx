import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Application from './Application';
import Profile from './Profile';
import Savedjobs from './Savedjobs';
import './seeker.css';
import ApplicationsList from './ApplicationsList';

function JobSeeker() {
  return (
    <div className="jobseeker-container">
      <nav className="jobseeker-navbar">
        <ul className="jobseeker-nav-list">
          <li className="jobseeker-nav-item">
            <Link to="profile" className="jobseeker-nav-button">
              Profile
            </Link>
          </li>
          <li className="jobseeker-nav-item">
            <Link to="application" className="jobseeker-nav-button">
              Job Application
            </Link>
          </li>
          <li className="jobseeker-nav-item">
            <Link to="savedjobs" className="jobseeker-nav-button">
              Saved Jobs
            </Link>
            <li className="jobseeker-nav-item">
            <Link to="ApplicationsList" className="jobseeker-nav-button">
            ApplicationsList
            </Link>
          </li>            
          </li>
        </ul>
      </nav>
      <div className="jobseeker-content">
        <Routes>
          <Route path="application" element={<Application />} />
          <Route path="profile" element={<Profile />} />
          <Route path="savedjobs" element={<Savedjobs />} />
          <Route path="ApplicationsList" element={<ApplicationsList/>} />
        </Routes>
      </div>
    </div>
  );
}

export default JobSeeker;
