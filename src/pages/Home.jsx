import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Home = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateResponse = async () => {
    if (!question.trim()) {
      alert("Por favor, ingresa una pregunta.");
      return;
    }

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyC5yxu38TqKhUXHRsJyb-dmPzsm5COBVL4");//process.env.REACT_APP_API_KEY); // Asegúrate de que la clave esté en .env
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(question);
      setResponse(result.response.text());
    } catch (error) {
      console.error("Error al generar la respuesta:", error);
      setResponse("Hubo un error al generar la respuesta. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Home</h1>
      <div>
        <input
          type="text"
          placeholder="Escribe tu pregunta aquí"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: "80%",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #555", // Borde gris oscuro
            color: "#fff", // Texto blanco para resaltar en fondo oscuro
            backgroundColor: "#333", // Fondo gris oscuro
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Sombra sutil
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#4CAF50")} // Verde al enfocar
          onBlur={(e) => (e.target.style.borderColor = "#555")} // Gris oscuro al desenfocar
        />

        <br />
        <button
          onClick={handleGenerateResponse}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Generando..." : "Enviar pregunta"}
        </button>
      </div>
      {response && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #555", // Borde gris oscuro
            borderRadius: "10px", // Esquinas redondeadas
            backgroundColor: "#333", // Fondo gris oscuro
            color: "#fff", // Texto blanco para contraste
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)", // Sombra para profundidad
            textAlign: "left", // Texto alineado a la izquierda
            fontFamily: "'Arial', sans-serif", // Fuente limpia
            lineHeight: "1.5", // Espaciado entre líneas
          }}
        >
          <h3 style={{ color: "#4CAF50", marginBottom: "10px" }}>Respuesta:</h3>{" "}
          {/* Título verde */}
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
