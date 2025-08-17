import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import FilmMenu from './pages/FilmMenu';
import FilmPage from './pages/FilmPage';
import MenuBar from './components/MenuBar';

export default function App() {
  return (
    <Router>
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          background: '#fafafa',
          color: '#222',
        }}
      >
        <MenuBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/films" element={<FilmMenu />} />
          <Route path="/films/:id" element={<FilmPage />} />
        </Routes>
      </div>
    </Router>
  );
}
