import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Navigation = ({ setLogged }) => {
  const navigate = useNavigate();

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
            <button onClick={() => navigate("/")}>Home</button>
          </li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <Outlet />
    </div>
  );
};

export default Navigation;
