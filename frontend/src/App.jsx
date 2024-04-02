import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import BookTickets from './components/BookTickets';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id/theaters" element={<MovieDetails />} />
          <Route path="/book/:id/:theaterId" element={<BookTickets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;