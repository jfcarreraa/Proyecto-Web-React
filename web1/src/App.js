import React, { useState, useEffect} from 'react';
import './App.css';
import Login from './components/Login';
import AppRouter from "./components/AppRouter"

function App() {
  const [logged, setLogged] = useState(false);
  
  useEffect(()=>{
    const UserLogged = localStorage.getItem("isLogged");
    if (UserLogged === "true") {
      setLogged(true);
    }
  },[])

  return (
    <div className="App">
      {logged ? (
        <AppRouter setLogged={setLogged}/>
      ) : (
        <Login logged={logged} setLogged={setLogged}/>
      )}
    </div>
  );
}

export default App;
