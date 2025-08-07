import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import RefreshHandler from './RefreshHandler.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On first load, check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

  return (
    <div className="App">
      {/* Automatically update authentication state on refresh */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
