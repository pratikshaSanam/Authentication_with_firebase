import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div 
      style={{
        background: "linear-gradient(to right,rgb(43 37 36), rgb(135 85 48))",
        minHeight: "100vh", 
        display: "flex", 
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Router>
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
