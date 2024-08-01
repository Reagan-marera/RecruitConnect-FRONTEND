import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Search from './components/Search';
import JobList from './components/Joblist';
import Footer from './components/Footer';
import EmployerLogin from './components/Employerlogin';
import SeekerLogin from './components/Seekerlogin';
import './App.css';

const App = () => {
  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/employer-login" element={<EmployerLogin />} />
          <Route path="/employer-signup" element={<EmployerLogin />} />
          <Route path="/seeker-login" element={<SeekerLogin />} />
          <Route path="/seeker-signup" element={<SeekerLogin />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
