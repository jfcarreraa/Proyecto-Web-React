import React from "react";

const Home = () => {
  const handleLogout = () => {
    localStorage.setItem("isLogged", "false");
  };
  return (
    <div>
      <div>Home</div>
    </div>
  );
};

export default Home;
