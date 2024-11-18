import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/NavBar/Navbar';
import AppRoutes from './routes/Routes';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        {!isAuthenticated ? (
          <Route
            path="*"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        ) : (
          <Route path="*" element={<AppRoutes />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
