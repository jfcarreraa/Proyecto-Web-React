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

  /*
  El use effect carga todos los usuarios en memoria
  */
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

  /*
  handleLogin recibe los parámetros a comprobar y devuelve tres posibles valores:
  el usuario encontrado, 0 si existe el usuario pero la contraseña es incorrecta, -1 si no existe el usuario
  */
  const handleLogin = (username, password) => {
    const user = users.find(
      (user) =>
        (user.username === username || user.email === username) &&
        user.password === password
    );
    if (user) {
      return user;
    } else if (
      users.some((u) => u.username === username || u.email === username)
    ) {
      return 0;
    } else {
      return -1;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //evita que se termine el evento antes de tiempo
    //comprueba que el form esté lleno
    if (username === "" || password === "") {
      setLoginError("Debe llenar todos los datos");
      return;
    }

    //maneja los posibles escenarios del login: exitoso, contraseña incorrecta, usuario invalido
    const loginUser = handleLogin(username, password);
    if (loginUser !== 0 && loginUser !== -1) {
      localStorage.setItem("user", JSON.stringify(loginUser));
      localStorage.setItem("isLogged", "true");
      setLogged(true);
      setLoginError("");
    } else if (loginUser === 0) {
      setLoginError("Wrong password");
      return;
    } else if (loginUser === -1) {
      setLoginError("User not found");
      return;
    }

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
