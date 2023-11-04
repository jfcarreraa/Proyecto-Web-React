import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navigation from "./Navigation";
import Login from "./Login";
const AppRouter = (props) => {
  return (
    <>
      <Router>
        <div className="app">
          <main>
            <Navigation setLogged={props.setLogged} />
            <Routes>
              <Route path="/" exact Component={Home}></Route>
              <Route path="/login" exact Component={Login}></Route>
              <Route path="/*" Component={Home}>
                {" "}
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
};

export default AppRouter;
