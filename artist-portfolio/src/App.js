import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddArtwork from "./pages/Add";
import EditArtwork from "./pages/Edit";
import AppHeader from "./components/AppHeader";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddArtwork />} />
        <Route path="/edit/:id" element={<EditArtwork />} />
      </Routes>
    </Router>
  );
}

export default App;
