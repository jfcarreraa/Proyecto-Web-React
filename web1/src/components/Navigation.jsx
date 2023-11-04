import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../App";


const Navigation = () => {
  const navigate = useNavigate();

  const setLogged = useContext(UserContext);

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
            {/* <button onClick={() => navigate("/")}>Home</button> */}
            <a className="nav-link Home" href="/" >Home</a>
          </li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <Outlet />
    </div>
  );
};

export default Navigation;
