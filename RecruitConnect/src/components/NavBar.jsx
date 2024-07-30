import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Landing</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/jobs">Job List</Link></li>
        <li><Link to="/employer-login">Employer Login</Link></li>
        <li><Link to="/seeker-login">Seeker Login</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
