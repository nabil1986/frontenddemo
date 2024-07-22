import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeviceForm from './DeviceForm';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [editingDevice, setEditingDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [detailsDevice, setDetailsDevice] = useState(null);
  const [inventorySearchTerm, setInventorySearchTerm] = useState('');

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/devices`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching devices: ', error);
    }
  };

  const handleEdit = (device) => {
    setEditingDevice(device);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/devices/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDevices();
    } catch (error) {
      console.error('Error deleting device: ', error);
    }
  };

  const handleDetails = (device) => {
      setDetailsDevice(device);
  };

  const filteredDevices = devices.filter(device =>
    device.device_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDevicesByInventoryNamme = devices.filter(device =>
    device.numero_inventaire.toLowerCase().includes(inventorySearchTerm.toLowerCase())
  );

  const handleFormSubmit = () => {
      setEditingDevice(null);
      fetchDevices();
  };

  const handleSearchTermChange = (e) => {
      setSearchTerm(e.target.value);
      setInventorySearchTerm('');  // Effacer le contenu de la barre de recherche par numéro d'inventaire
      setDetailsDevice(null);
  };

  const handleSearchTermChangeParNumeroInventaire = (e) => {
        setInventorySearchTerm(e.target.value);
        setSearchTerm('');  // Effacer le contenu de la barre de recherche par désignation
        setDetailsDevice(null);
    };

  return (
    <div>
      <h2>Liste des appareils</h2>
      <input
        type="text"
        placeholder="Rechercher par désignation"
        value={searchTerm}
        onChange={handleSearchTermChange}
        className="search-bar"
      />
      <input
              type="text"
              placeholder="Rechercher par numéro d'inventaire"
              value={inventorySearchTerm}
              onChange={handleSearchTermChangeParNumeroInventaire}
              className="search-bar"
            />
      {searchTerm && (
      <table>
        <thead>
          <tr>
            <th>Numéro d'inventaire</th>
            <th>Nom de l'appareil</th>
            <th>Quantité de graissage</th>
            <th>Période de graissage</th>
            <th>Observation</th>
            <th>Contrôle de niveau</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((device) => (
            <tr key={device.id}>
              <td>{device.numero_inventaire}</td>
              <td>{device.device_name}</td>
              <td>{device.grease_quantity}</td>
              <td>{device.grease_period}</td>
              <td>{device.observation}</td>
              <td>{device.niveau ? 'Oui' : 'Non'}</td>
              <td>
                <button onClick={() => handleEdit(device)}>Modifier</button>
                <button onClick={() => handleDelete(device.id)}>Supprimer</button>
                <button onClick={() => handleDetails(device)}>Afficher les détails</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {inventorySearchTerm && (
            <table>
              <thead>
                <tr>
                  <th>Numéro d'inventaire</th>
                  <th>Nom de l'appareil</th>
                  <th>Quantité de graissage</th>
                  <th>Période de graissage</th>
                  <th>Observation</th>
                  <th>Contrôle de niveau</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevicesByInventoryNamme.map((device) => (
                            <tr key={device.id}>
                              <td>{device.numero_inventaire}</td>
                              <td>{device.device_name}</td>
                              <td>{device.grease_quantity}</td>
                              <td>{device.grease_period}</td>
                              <td>{device.observation}</td>
                              <td>{device.niveau ? 'Oui' : 'Non'}</td>
                              <td>
                                <button onClick={() => handleEdit(device)}>Modifier</button>
                                <button onClick={() => handleDelete(device.id)}>Supprimer</button>
                                <button onClick={() => handleDetails(device)}>Afficher les détails</button>
                              </td>
                            </tr>
                          ))}
              </tbody>
            </table>
            )}
      {editingDevice && (
              <DeviceForm
                device={editingDevice}
                onSubmit={handleFormSubmit}
              />
            )}
      {detailsDevice && (
              <div className="details-card">
                <h3>Détails de l'appareil</h3>
                <p><strong>Numéro d'inventaire :</strong> {detailsDevice.numero_inventaire}</p>
                <p><strong>Nom de l'appareil :</strong> {detailsDevice.device_name}</p>
                <p><strong>Quantité de graissage :</strong> {detailsDevice.grease_quantity}</p>
                <p><strong>Période de graissage :</strong> {detailsDevice.grease_period}</p>
                <p><strong>Observation :</strong> {detailsDevice.observation}</p>
                <p><strong>Contrôle de niveau :</strong> {detailsDevice.niveau ? 'Oui' : 'Non'}</p>
                <button onClick={() => setDetailsDevice(null)}>Fermer</button>
              </div>
            )}
    </div>
  );
};

export default DeviceList;
