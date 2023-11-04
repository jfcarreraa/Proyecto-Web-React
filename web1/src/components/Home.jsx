import React from "react";

const Home = () => {
  const handleLogout = () => {
    localStorage.setItem("isLogged", "false");
  };
  return (
    <div>
      <div>Home</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
