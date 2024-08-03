import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Joblist from './components/Joblist';
import Footer from './components/Footer';
import EmployerLogin from './components/Employerlogin';
import SeekerLogin from './components/Seekerlogin';
import Register from './components/Register';


import './App.css';

const App = () => {
  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route>
              <Route path="/" element={<Landing />}></Route>
              <Route path="/joblist" element={<Joblist />} />
              <Route path="/employer-login" element={<EmployerLogin />}></Route>
              <Route path="/employer-signup" element={<EmployerLogin />}></Route>
              <Route path="/seeker-signup" element={<SeekerLogin />} />
              <Route path="/seeker-login" element={<SeekerLogin />}></Route>
              <Route path="/register" element={<Register />} />
   
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
