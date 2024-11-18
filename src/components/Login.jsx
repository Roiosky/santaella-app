import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "https://673a3e44339a4ce44517aa5d.mockapi.io/stock/users"
      );
      const user = data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        setIsAuthenticated(true);
        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
          text: "Por favor, verifica tu correo y contraseña.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar con el servidor.",
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://673a3e44339a4ce44517aa5d.mockapi.io/stock/users",
        { email, password }
      );
      setIsRegistering(false);
      Swal.fire({
        icon: "success",
        title: "Usuario registrado",
        text: "Ahora inicia sesión con tus credenciales.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el usuario.",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#212529", // Fondo rosado
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "20px",
          backgroundColor: "#fff", // Card blanca
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#000" }}>
          {isRegistering ? "Registrarse" : "Iniciar Sesión"}
        </h2>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "5px", color: "#000" }}>
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                color: "#000", // Texto negro
                placeholderTextColor: "#aaa", // Placeholder gris
              }}
              placeholder="Ingresa tu correo"
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "5px", color: "#000" }}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                color: "#000", // Texto negro
                placeholderTextColor: "#aaa", // Placeholder gris
              }}
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#4caf50", // Botón rojo
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {isRegistering ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>
        <button
          style={{
            marginTop: "10px",
            display: "block",
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </button>
      </div>
    </div>
  );
};

export default Login;
