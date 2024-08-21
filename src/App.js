import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter, HashRouter } from 'react-router-dom';
import { TravelDiaryProvider } from './components/TravelDiaryContext';
import Home from './components/Home';
import Entries from './components/Entries';
import './App.css';

function App() {
  return (
    <TravelDiaryProvider>
      <HashRouter>
        <div className="app-container">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/entries">Entries</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/entries" element={<Entries />} />
          </Routes>
        </div>
      </HashRouter>
    </TravelDiaryProvider>
  );
}

export default App;
