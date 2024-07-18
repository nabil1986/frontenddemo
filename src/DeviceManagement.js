// src/DeviceManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeviceForm from './components/DeviceForm';
import DeviceList from './components/DeviceList';

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [currentDevice, setCurrentDevice] = useState(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/devices`);
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching devices: ', error);
    }
  };

  const handleEdit = (device) => {
    setCurrentDevice(device);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/devices/${id}`);
      fetchDevices();
    } catch (error) {
      console.error('Error deleting device: ', error);
    }
  };

  const handleSubmit = () => {
    fetchDevices();
    setCurrentDevice(null);
  };

  return (
    <div>
      <h2>Gestion des Appareils</h2>
      <DeviceForm device={currentDevice} onSubmit={handleSubmit} />
      <DeviceList devices={devices} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DeviceManagement;
