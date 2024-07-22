import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import DeviceForm from './DeviceForm';
import DeviceList from './DeviceList';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/devices" element={isAuthenticated ? <DeviceForm /> : <Navigate to="/" />} />
        <Route path="/listdevices" element={isAuthenticated ? <DeviceList /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
