import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Papa from "papaparse"; // Para leer archivos CSV
import * as XLSX from "xlsx"; // Para leer archivos Excel

const Home = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState(""); // Contenido del archivo
  const [fileTypeError, setFileTypeError] = useState("");

  const handleGenerateResponse = async () => {
    if (!question.trim()) {
      alert("Por favor, ingresa una pregunta.");
      return;
    }

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Si hay un archivo cargado, se usa el contenido para generar la respuesta
      const context = fileContent ? `Archivo cargado: ${fileContent}` : '';
      const result = await model.generateContent(`${context} ${question}`);

      setResponse(result.response.text());
    } catch (error) {
      console.error("Error al generar la respuesta:", error);
      setResponse("Hubo un error al generar la respuesta. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Manejo del cambio en el archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ['csv', 'txt', 'xlsx', 'xls'];
    const fileType = selectedFile?.name.split('.').pop().toLowerCase();

    if (selectedFile && allowedTypes.includes(fileType)) {
      setFile(selectedFile);
      setFileTypeError('');
      readFileContent(selectedFile);
    } else {
      setFile(null);
      setFileTypeError('Solo se permiten archivos CSV, Excel o TXT.');
    }
  };

  // Función para leer el contenido del archivo según su tipo
  const readFileContent = (file) => {
    const fileType = file.name.split('.').pop().toLowerCase();

    if (fileType === 'csv') {
      Papa.parse(file, {
        complete: (result) => {
          setFileContent(JSON.stringify(result.data)); // Puedes procesar los datos como lo necesites
        },
        header: true, // Si el archivo CSV tiene encabezado
      });
    } else if (fileType === 'txt') {
      const reader = new FileReader();
      reader.onload = () => {
        setFileContent(reader.result);
      };
      reader.readAsText(file);
    } else if (fileType === 'xlsx' || fileType === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Tomamos la primera hoja
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        setFileContent(JSON.stringify(json)); // Puedes procesar el JSON según necesites
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Sistema De Inventario Santaella Accesorios</h1>
      <p>Este programa te permitirá llevar un control detallado sobre los productos de tu empresa.</p>
      <p>
        1- Para crear un producto, dirígete a la pestaña de crear.<br />
        2- Para listar todos los productos, ve a la pestaña de listar.<br />
        3- Edita o elimina productos dando clic en el icono editar o eliminar.<br />
        4- Usa IA para hacer más fácil y rápido tu producto.
      </p>

      <div style={{ marginTop: "20px" }}>
        <input
          type="file"
          accept=".csv, .txt, .xlsx, .xls"
          onChange={handleFileChange}
          style={{ marginBottom: "10px", padding: "10px", fontSize: "16px" }}
        />
        {fileTypeError && <p style={{ color: "red" }}>{fileTypeError}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Escribe tu pregunta aquí o preguntale a la IA sobre cualquier cosa"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: "80%",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #555",
            color: "#fff",
            backgroundColor: "#333",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#4CAF50")}
          onBlur={(e) => (e.target.style.borderColor = "#555")}
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
            border: "1px solid #555",
            borderRadius: "10px",
            backgroundColor: "#333",
            color: "#fff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
            textAlign: "left",
            fontFamily: "'Arial', sans-serif",
            lineHeight: "1.5",
          }}
        >
          <h3 style={{ color: "#4CAF50", marginBottom: "10px" }}>Respuesta:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
