import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Application from './Application';
import Profile from './Profile';
import './seeker.css';
import Savedjobs from './Savedjobs';

function JobSeeker() {
  return (
    <div className="jobseeker-container">
      <nav className="jobseeker-navbar">
        <ul className="jobseeker-nav-list">
          <li className="jobseeker-nav-item">
            <Link to="profile" className="jobseeker-nav-button">Profile</Link>
          </li>
            <li className="jobseeker-nav-item">
            <Link to="application" className="jobseeker-nav-button">Job application</Link>
          </li>
          <li className="savedjobs-nav-item">
            <Link to="savedjobs" className="savedjobs-nav-button">Savedjobs</Link>
          </li>

        </ul>
      </nav>
      <div className="jobseeker-content">
        <Routes>
          <Route path="application" element={<Application />} />
          <Route path="profile" element={<Profile />} />
          <Route path="savedjobs" element={<Savedjobs />} />
        </Routes>
      </div>
    </div>
  );
}

export default JobSeeker;
