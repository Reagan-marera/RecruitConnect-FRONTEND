
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/employer-login" element={<EmployerLogin />} />
        <Route path="/seeker-login" element={<SeekerLogin />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
