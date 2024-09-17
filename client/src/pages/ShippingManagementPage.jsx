import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaShippingFast, FaMapMarkerAlt } from 'react-icons/fa';

const shippingZonesData = [
  {
    id: '1',
    zone: 'North America',
    cost: '$10.00',
    carrier: 'FedEx',
  },
  {
    id: '2',
    zone: 'Europe',
    cost: '$15.00',
    carrier: 'DHL',
  },
  // Add more mock data as needed
];

const ShippingManagementPage = () => {
  const [zones, setZones] = useState(shippingZonesData);
  const [newZone, setNewZone] = useState({ zone: '', cost: '', carrier: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewZone({ ...newZone, [name]: value });
  };

  const handleAddZone = () => {
    setZones([...zones, { ...newZone, id: (zones.length + 1).toString() }]);
    setNewZone({ zone: '', cost: '', carrier: '' });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Shipping Management</h1>
      
      {/* Add New Shipping Zone */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Shipping Zone</h2>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            name="zone"
            placeholder="Zone Name"
            value={newZone.zone}
            onChange={handleInputChange}
            className="mb-4 md:mb-0 border border-gray-300 rounded-lg p-3 w-full md:w-1/3"
          />
          <input
            type="text"
            name="cost"
            placeholder="Shipping Cost"
            value={newZone.cost}
            onChange={handleInputChange}
            className="mb-4 md:mb-0 border border-gray-300 rounded-lg p-3 w-full md:w-1/3"
          />
          <input
            type="text"
            name="carrier"
            placeholder="Carrier"
            value={newZone.carrier}
            onChange={handleInputChange}
            className="mb-4 md:mb-0 border border-gray-300 rounded-lg p-3 w-full md:w-1/3"
          />
          <button
            onClick={handleAddZone}
            className="bg-blue-500 text-white rounded-lg p-3 flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add Zone</span>
          </button>
        </div>
      </div>

      {/* Shipping Zones Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left text-gray-600">Zone</th>
              <th className="p-4 text-left text-gray-600">Cost</th>
              <th className="p-4 text-left text-gray-600">Carrier</th>
              <th className="p-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {zones.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-600">No shipping zones available</td>
              </tr>
            ) : (
              zones.map(zone => (
                <tr key={zone.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{zone.zone}</td>
                  <td className="p-4">{zone.cost}</td>
                  <td className="p-4">{zone.carrier}</td>
                  <td className="p-4 flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                    <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShippingManagementPage;
