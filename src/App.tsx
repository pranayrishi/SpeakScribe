import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Navbar} from "./components/navbar";
//import {Home} from './pages/home/home';
import {Login} from './pages/login/login';
import {Upload} from './pages/upload/upload'
import {Footer} from './components/footer'
import Scrollbar from './pages/home/homescroll'
import {Assignments} from './pages/assignments/assignments'

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="site-wrapper">
        <div className="site-content">
        <Navbar />
        <Routes>
          <Route path="/" element={<Scrollbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/assignments" element={<Assignments />} />
        </Routes>
        </div>
        <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
