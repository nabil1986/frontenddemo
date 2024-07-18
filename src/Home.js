// src/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bienvenue sur l'application de gestion de graissage des appareils</h1>
      <nav>
        <ul>
          <li><Link to="/devices">Enregistrement des Appareils</Link></li>
          <li><Link to="/listdevices">Liste des Appareils</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
