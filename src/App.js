/*import React from 'react';
import './App.css';
import DeviceList from './components/DeviceList';
import DeviceForm from './components/DeviceForm';

const App = () => {
  return (
    <div className="App">
      <h1>Gestion de Graissage des Appareils</h1>
      <DeviceForm />
      <DeviceList />
    </div>
  );
};

export default App;*/

// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import DeviceManagement from './DeviceManagement';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devices" element={<DeviceManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

