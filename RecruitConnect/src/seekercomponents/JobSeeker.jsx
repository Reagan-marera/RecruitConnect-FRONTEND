import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Application from './Application';
// import Profile from './Profile';
import OnboardingWizard from './OnboardingWizard';
import Savedjobs from './Savedjobs';
import './seeker.css';

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
          </li>
        </ul>
      </nav>
      <div className="jobseeker-content">
        <Routes>
          <Route path="application" element={<Application />} />
          <Route path="profile" element={<OnboardingWizard />} />
          <Route path="savedjobs" element={<Savedjobs />} />
        </Routes>
      </div>
    </div>
  );
}

export default JobSeeker;
