import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      onLogin(); // Autentica al usuario
    } else {
      setErrorMessage("Correo o contraseña incorrectos");
    }
  };

  const handleGoToRegister = () => {
    navigate("/register"); // Redirige al registro
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@puce.edu.ec"
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit">Iniciar Sesión</button>
      </form>

      <div>
        <button onClick={handleGoToRegister}>
          ¿Aún no tienes una cuenta? Regístrate aquí
        </button>
      </div>
    </div>
  );
};

export default Login;
