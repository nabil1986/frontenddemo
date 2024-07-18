import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeviceForm from './DeviceForm';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [editingDevice, setEditingDevice] = useState(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/devices`)
      .then(response => setDevices(response.data))
      .catch(error => console.error('Error fetching data: ', error));
  };

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/devices/${id}`)
      .then(() => fetchDevices())
      .catch(error => console.error('Error deleting device: ', error));
  };

  const handleEdit = (device) => {
    setEditingDevice(device);
  };

  const handleFormSubmit = () => {
    setEditingDevice(null);
    fetchDevices();
  };

  return (
    <div>
      <h2>Liste des Appareils</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Période</th>
            <th>Observation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <tr key={device.id}>
              <td>{device.device_name}</td>
              <td>{device.grease_quantity}</td>
              <td>{device.grease_period}</td>
              <td>{device.observation}</td>
              <td>
                <div className="device-buttons">
                    <button onClick={() => handleEdit(device)}>Modifier</button>
                    <button onClick={() => handleDelete(device.id)}>Supprimer</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingDevice && (
        <DeviceForm
          device={editingDevice}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default DeviceList;
