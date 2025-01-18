import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      onLogin();
    } else {
      setErrorMessage("Correo o contraseña incorrectos");
    }
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@puce.edu.ec"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="form-input"
              required
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>

          <button 
            type="button" 
            onClick={handleGoToRegister} 
            className="login-button"
            style={{ background: 'transparent', border: '1px solid #4299e1' }}
          >
            ¿Aún no tienes una cuenta? Regístrate aquí
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;