import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Joblist from './components/JobList';
import Footer from './components/Footer';
import EmployerDashboard from './components/EmployerDashboard';
import './index.css'
// import './App.css';
import Logout from './components/Logout';
import { useAuth } from './components/AuthContext';
import EmployerLogin from './logincomponent/Employerlogin';
import SeekerLogin from './logincomponent/Seekerlogin';
import Register from './logincomponent/Register';
import JobSeeker from './seekercomponents/JobSeeker';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsOfService from './pages/terms';
import PrivacyPolicy from './pages/Policy';
import JobPostingForm from './components/JobPostingForm';
import JobPostingDetails from './components/JobPostingDetails';
import JobPostingEdit from './components/JobPostingEditForm';
import JobPostingList from './components/JobPostingList';
import ForgotPassword from './logincomponent/ForgotPassword';
import JobList from './components/JobList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const auth = useAuth();
  const isAuthenticated = auth ? auth.isAuthenticated : false;

  return (
    <>
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
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/joblist" element={<JobList/>} />
          {isAuthenticated && <Route path="/logout" element={<Logout />} />}

        </Routes>
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
