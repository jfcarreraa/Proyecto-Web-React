import React, { useState, useEffect} from 'react';
import './App.css';
import Login from './components/Login';
import AppRouter from "./components/AppRouter"

export const UserContext = React.createContext();

function App() {
  const [logged, setLogged] = useState(false);
  
  useEffect(()=>{
    const UserLogged = localStorage.getItem("isLogged");
    if (UserLogged === "true") {
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
