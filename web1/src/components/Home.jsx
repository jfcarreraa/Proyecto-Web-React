import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div>
      <div>Home</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
