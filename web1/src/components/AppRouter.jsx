import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navigation from "./Navigation";
import Login from "./Login";
import CompletePost from "./CompletePost";
const AppRouter = (props) => {
  return (
    <>
      <Router>
        <div className="app">
          <main>
            {/*Se genera el nav bar y las rutas de la app*/}
            <Navigation />
            <Routes>
              <Route path="/" exact Component={Home}></Route>
              <Route path="/login" exact Component={Login}></Route>
              <Route path="/post/:id" exact Component={CompletePost}></Route>
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
