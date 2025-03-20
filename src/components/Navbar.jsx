import React, { useState } from 'react';
import '../App.css';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = ({ onNavItemClick, curSelectedNav, onSearch, setIsAuthenticated }) => {
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

  const togglePopupMenu = () => {
    setIsPopupMenuOpen(!isPopupMenuOpen);
  };

  return (
    <nav>
      <div className="main-nav container flex">
        <a
          href="#"
          onClick={() => window.location.reload()}
          className="company-logo"
        >
          <img src="./logomain.png" alt="company logo" className="logo-image" />
        </a>
        <div className="nav-links">
          <ul className="flex">
            <li className={`hover-link nav-item ${curSelectedNav === 'ipl' ? 'active' : ''}`} id="ipl" onClick={() => onNavItemClick('ipl')}>ENTERTAINMENT</li>
            <li className={`hover-link nav-item ${curSelectedNav === 'finance' ? 'active' : ''}`} id="finance" onClick={() => onNavItemClick('finance')}>FINANCE</li>
            <li className={`hover-link nav-item ${curSelectedNav === 'politics' ? 'active' : ''}`} id="politics" onClick={() => onNavItemClick('politics')}>POLITICS</li>
            <li className={`hover-link nav-item ${curSelectedNav === 'account' ? 'active' : ''}`} id="account">
              <Link to="/my-account" className="my-account-link" onClick={() => onNavItemClick('account')}>
                ACCOUNT
              </Link>
            </li>
            <li>
              <Logout setIsAuthenticated={setIsAuthenticated} />
            </li>
          </ul>
        </div>
        <SearchBar onSearch={onSearch} />
        <div className="hamburger-menu" onClick={togglePopupMenu}>
          &#9776;
        </div>
      </div>

      {/* Popup Menu */}
      <div className={`popup-menu ${isPopupMenuOpen ? 'active' : ''}`}>
        <div className="close-btn" onClick={togglePopupMenu}>
          &times;
        </div>
        <ul>
          <li className={`hover-link nav-item ${curSelectedNav === 'ipl' ? 'active' : ''}`} id="ipl" onClick={() => { onNavItemClick('ipl'); togglePopupMenu(); }}>ENTERTAINMENT</li>
          <li className={`hover-link nav-item ${curSelectedNav === 'finance' ? 'active' : ''}`} id="finance" onClick={() => { onNavItemClick('finance'); togglePopupMenu(); }}>FINANCE</li>
          <li className={`hover-link nav-item ${curSelectedNav === 'politics' ? 'active' : ''}`} id="politics" onClick={() => { onNavItemClick('politics'); togglePopupMenu(); }}>POLITICS</li>
          <li onClick={togglePopupMenu}>
            <Link to="/my-account" className="my-account-link">
              ACCOUNT
            </Link>
          </li>
          <li onClick={togglePopupMenu}>
            <Logout setIsAuthenticated={setIsAuthenticated} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;