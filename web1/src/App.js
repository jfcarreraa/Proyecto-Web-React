import React, { useState, useEffect} from 'react';
import './App.css';
import Login from './components/Login';
import AppRouter from "./components/AppRouter"

export const UserContext = React.createContext();

/*Hooks utilizados: 
  useEffect: se ejecutan una vez cuando se renderiza el componente. O puede ligarse a un estado específico
  useState: es para generar estados o variables con su respectivo set method. Los estados se vinculan con elementos de html
  useNavigate: es para navegar utilizando react-router-dom
  useLocation: es para almacenar estados de otros componentes dentro de la aplicación
  useContext: se utiliza para crear un contexto dentro la aplicación para tener valores globales y evitar pasar props entre componentes
*/

function App() {
  const [logged, setLogged] = useState(false);
  
  useEffect(()=>{
    const UserLogged = localStorage.getItem("isLogged"); //se accede a la información del local storage
    if (UserLogged === "true") { //Si hay alguien logueado, el elemento isLogged va a estar en true
      setLogged(true);
    }
  },[])

  return (
    <UserContext.Provider value={setLogged}>
      <div className="App">
        {logged ? (
          <AppRouter />
        ) : (
          <Login />
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
