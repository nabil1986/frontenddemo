import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeviceForm = ({ device, onSubmit }) => {
  const [deviceName, setDeviceName] = useState(device ? device.device_name : '');
  const [greaseQuantity, setGreaseQuantity] = useState(device ? device.grease_quantity : '');
  const [greasePeriod, setGreasePeriod] = useState(device ? device.grease_period : '');
  const [observation, setObservation] = useState(device ? device.observation : '');
  const [levelControl, setLevelControl] = useState(device ? (device.niveau === 1 ? 'oui' : 'non') : 'non');

  useEffect(() => {
    if (device) {
      setDeviceName(device.device_name);
      setGreaseQuantity(device.grease_quantity);
      setGreasePeriod(device.grease_period);
      setObservation(device.observation);
      setLevelControl(device.niveau === 1 ? 'oui' : 'non');
    }
  }, [device]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const updatedDevice = {
      device_name: deviceName,
      grease_quantity: greaseQuantity,
      grease_period: greasePeriod,
      observation: observation,
      level_control: levelControl // Nouveau champ
    };

    try {
      if (device) {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/devices/${device.id}`,
          updatedDevice,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onSubmit();
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/devices`,
          updatedDevice,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onSubmit();
      }
    } catch (error) {
      console.error('Error submitting form: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="deviceName">Désignation</label>
        <input
          type="text"
          id="deviceName"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="greaseQuantity">Quantité</label>
        <input
          type="number"
          id="greaseQuantity"
          value={greaseQuantity}
          onChange={(e) => setGreaseQuantity(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="greasePeriod">Période</label>
        <input
          type="text"
          id="greasePeriod"
          value={greasePeriod}
          onChange={(e) => setGreasePeriod(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Contrôle de Niveau</label>
        <div>
          <label>
            <input
              type="radio"
              name="level_control"
              value="oui"
              checked={levelControl === 'oui'}
              onChange={(e) => setLevelControl(e.target.value)}
            />
            Oui
          </label>
          <label>
            <input
              type="radio"
              name="level_control"
              value="non"
              checked={levelControl === 'non'}
              onChange={(e) => setLevelControl(e.target.value)}
            />
            Non
          </label>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="observation">Observation</label>
        <textarea
          id="observation"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
        />
      </div>
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default DeviceForm;
