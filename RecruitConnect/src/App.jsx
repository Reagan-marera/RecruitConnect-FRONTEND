import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Joblist from './components/Joblist';
import Footer from './components/Footer';
import EmployerLogin from './components/Employerlogin';
import SeekerLogin from './components/Seekerlogin';
import Register from './components/Register';
import JobSeeker from './seekercomponents/JobSeeker';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsOfService from './pages/terms';
import PrivacyPolicy from './pages/Policy';
import ForgotPassword from './components/Forgot Password';
import JobPostingForm from './components/JobPostingForm';
import JobPostingDetails from './components/JobPostingDetails';
import JobPostingEdit from './components/JobPostingEditForm';
import JobPostingList from './components/JobPostingList';
import './App.css';

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/joblist" element={<Joblist />} />
        <Route path="/employer-login" element={<EmployerLogin />} />
        <Route path="/employer-signup" element={<EmployerLogin />} />
        <Route path="/seeker-signup" element={<SeekerLogin />} />
        <Route path="/seeker-login" element={<SeekerLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobseeker/*" element={<JobSeeker />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/jobposting" element={<JobPostingForm />} />
        <Route path="/jobposting/:id" element={<JobPostingDetails />} />
        <Route path="/jobposting/edit/:id" element={<JobPostingEdit />} />
        <Route path="/jobposting/list" element={<JobPostingList />} /> 
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
