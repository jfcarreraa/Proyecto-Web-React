import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navigation = ({ setLogged }) => {
  const handleLogout = () => {
    localStorage.setItem("isLogged", "false");
    localStorage.removeItem("user");
    setLogged(false);
  };
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
      <Outlet />
    </div>
  );
};

export default Navigation;
