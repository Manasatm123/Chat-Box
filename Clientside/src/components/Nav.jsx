import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
import photo from '../assets/photo.jpeg';

const Nav = ({ profile, setName }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };
console.log(profile);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-container">
         
         <img src={photo} alt="Chatbox Logo" className="logo" />
          <h1 className="navbar-title">Chatbox</h1>
        </div>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="navbar-right">
        {/* User's name and profile photo */}
        <div className="user-info" onClick={toggleDropdown}>
          <span className="user-name">{profile.username}</span>
          <div className="profile-pic">
            <img src={profile.profile} alt="Profile" className="profile-img" />
          </div>
        </div>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/profile" className="dropdown-item">
              Profile
            </Link>
            <button onClick={handleLogout} className="dropdown-item">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
