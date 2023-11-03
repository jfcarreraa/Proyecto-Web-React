import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Login from "./Login";
import Home from "./Home";

const AppRouter = () => {
  const init = () => {
    const UserLogged = localStorage.getItem("isLogged");
    return UserLogged;
  };

  const UserLogged = init();
  // eslint-disable-next-line
  const [logged, setLogged] = useState(init());

  useEffect(() => {
    const UserLogged = localStorage.getItem("isLogged");
    if (UserLogged === "true") {
      setLogged(true);
    }
  }, [UserLogged]);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/*",
      element: <Navigate to={"/"} />,
      errorElement: <ErrorPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default AppRouter;
