// src/components/Header.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { userData, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          Hospital Equipment App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {userData && (
              <li className="nav-item">
                <span className="nav-link">สวัสดี, {userData.username}</span>
              </li>
            )}
            <li className="nav-item">
              <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                ออกจากระบบ
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
