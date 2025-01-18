import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === email) {
      setErrorMessage("El correo ya está registrado");
    } else {
      const newUser = { email, password };
      onRegister(newUser);
      navigate("/");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Registro</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label className="form-label">Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@puce.edu.ec"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar Contraseña"
              required
              className="form-input"
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="register-button">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;