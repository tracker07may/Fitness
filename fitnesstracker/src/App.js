import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Register from './Component/Register';
import Showdata from './Component/Showdata';
import Login from './Component/Login';
import ForgotPassword from './Component/ForgotPassword';




function App() {
  return (
    <Router>
      <div className="container mt-4">
        {/* <h1 className="text-center mb-4">Fitness Tracker</h1> */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/show" element={<Showdata />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fp" element={<ForgotPassword />} />

          

          
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
