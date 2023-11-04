import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navigation = ({ setLogged }) => {
  const handleLogout = () => {
    localStorage.setItem("isLogged", "false");
    localStorage.removeItem("user");
    setLogged(false);
  };
  return (
    <div className="main-container">
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <Outlet />
    </div>
  );
};

export default Navigation;
