import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tecnica from './pages/Tecnica';
import Potenza from './pages/Potenza';
import Filosofia from './pages/Filosofia';

export default function App() {
  return (
    <Router basename="/La-Mano">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tecnica" element={<Tecnica />} />
        <Route path="/potenza" element={<Potenza />} />
        <Route path="/filosofia" element={<Filosofia />} />
      </Routes>
    </Router>
  );
}
