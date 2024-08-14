import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Application from './Application';
import Profile from './Profile';
import Savedjobs from './Savedjobs';
import './seeker.css';

function JobSeeker() {
  return (
    <div className="jobseeker-container">
      <nav className="jobseeker-navbar">
        <ul className="jobseeker-nav-list">
          <li className="jobseeker-nav-item">
            <NavLink to="profile" className="jobseeker-nav-button" activeClassName="active">Profile</NavLink>
          </li>
          <li className="jobseeker-nav-item">
            <NavLink to="application" className="jobseeker-nav-button" activeClassName="active">Job Application</NavLink>
          </li>
          <li className="jobseeker-nav-item">
            <NavLink to="savedjobs" className="jobseeker-nav-button" activeClassName="active">Saved Jobs</NavLink>
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
