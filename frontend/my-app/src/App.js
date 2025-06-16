import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h1>Home Page</h1>;
}

function Balance() {
  return <h1>Balance Page lalala</h1>;
}

function Graph() {
  return <h1>Graph Page</h1>;
}

function App() {
  return (
    <Router>
      <div>
      <nav style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'Blue',
        padding: '10px 0',
        textAlign: 'center',
        borderTop: '1px solid #ccc',
      }}>
        <Link to="/" style={{ color: 'black', margin: '0 5px', textDecoration: 'none',backgroundColor: 'White'}}>Home</Link>|
        <Link to="/balance" style={{ color: 'white', margin: '0 5px', textDecoration: 'none',backgroundColor: 'Blue' }}>Balance 💲</Link>|
        <Link to="/graph" style={{ color: 'white', margin: '0 5px', textDecoration: 'none' }}>Graph</Link>
      </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
