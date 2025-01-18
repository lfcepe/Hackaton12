import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import NASAImages from "./components/NASAImages";
import Register from "./components/register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Guardar el usuario registrado

  // Comprobamos si hay un usuario registrado en localStorage al inicio
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Si existe, lo cargamos
      setIsAuthenticated(false); // No lo autenticamos hasta el login
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true); // Autenticación exitosa
  };

  const handleRegister = (userData) => {
    setUser(userData); // Guardamos los datos del usuario registrado
    localStorage.setItem("user", JSON.stringify(userData)); // Guardamos en localStorage
    setIsAuthenticated(false); // No autenticamos hasta que el login sea exitoso
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user === null ? (
              <Register onRegister={handleRegister} /> // Si no hay usuario registrado, muestra registro
            ) : isAuthenticated ? (
              <Navigate to="/nasa" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          path="/nasa"
          element={
            isAuthenticated ? <NASAImages /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
