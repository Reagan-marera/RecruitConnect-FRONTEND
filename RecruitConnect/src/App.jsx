import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Search from './components/Search';
import JobList from './components/Joblist';
import Footer from './components/Footer';
import EmployerLogin from './components/Employerlogin';
import Logout from './Logout';
import SeekerLogin from './components/Seekerlogin';
import EmployerForm from './components/EmployerForm';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/search" element={<Search />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/employer-login" element={<EmployerLogin />} />
      <Route path="/seeker-login" element={<SeekerLogin />} />
      <Route path="/employerform" element={<EmployerForm />} />
      {isAuthenticated && <Route path="/logout" element={<Logout />} />}
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div>
        <NavBar />
        <AppRoutes />
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
