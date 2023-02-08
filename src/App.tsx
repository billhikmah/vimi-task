import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import Projects from "./pages/projects";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
