import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Joblist from './components/Joblist';
import Footer from './components/Footer';
import EmployerLogin from './logincomponent/Employerlogin';
import SeekerLogin from './logincomponent/Seekerlogin';
import Register from './logincomponent/Register';
import JobSeeker from './seekercomponents/JobSeeker';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsOfService from './pages/terms';
import PrivacyPolicy from './pages/Policy';
import ForgotPassword from './logincomponent/ForgotPassword';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
