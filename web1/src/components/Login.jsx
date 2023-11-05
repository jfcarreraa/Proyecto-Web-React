import React, { useState, useEffect, useContext } from "react";
import "../styles/styles.scss";
import { UserContext } from "../App";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState("");

  const setLogged = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) {
          throw new Error("Error de conexión con base de datos");
        }

        const data = await response.json();
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        setLoginError(error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const clear = () => {
    setUsername("");
    setPassword("");
  };

  const handleLogin = (username, password) => {
    const user = users.find(
      (user) =>
        (user.username === username || user.email === username) &&
        user.password === password
    );
    return user;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "" || password === "") {
      setLoginError("Debe llenar todos los datos");
      return;
    }

    const loginUser = handleLogin(username, password);
    if (loginUser) {
      localStorage.setItem("user", JSON.stringify(loginUser));
      localStorage.setItem("isLogged", "true");
      setLogged(true);
      setLoginError("");
    } else setLoginError("El usuario no existe");

    clear();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <br />
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          {loginError && <div className="login-error-label">{loginError}</div>}
          <button className="form-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
