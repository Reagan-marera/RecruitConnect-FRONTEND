import React from 'react';
import {Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Search from './components/Search';
import Joblist from './components/Joblist';
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
          <Route>
        
              <Route path="/" element={<Landing />}></Route>
              <Route path="/search" element={<Search />}></Route>
              <Route path="/joblist" element={<Joblist />} />
              <Route path="/jobs" element={<Landing />}></Route>
              <Route path="/employer-login" element={<EmployerLogin />}></Route>
              <Route path="/seeker-login" element={<SeekerLogin />}></Route>
       
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
