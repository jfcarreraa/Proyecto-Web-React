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
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigate("/")}>Home</button>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
      <Outlet />
    </div>
  );
};

export default Navigation;
