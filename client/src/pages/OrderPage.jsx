import React, { useState } from 'react';
import { FaSearch, FaFilter, FaFileAlt, FaEdit, FaTrash } from 'react-icons/fa';

const ordersData = [
  {
    id: '12345',
    customerName: 'John Doe',
    date: '2024-09-15',
    status: 'Pending',
    total: '$120.00',
  },
  // Add more mock data as needed
];

const OrderPage = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = ordersData.filter(order =>
    (statusFilter === 'All' || order.status === statusFilter) &&
    (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.includes(searchTerm))
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Management</h1>
      
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        {/* Search Bar */}
        <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 w-full md:w-1/2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by customer or order ID"
            className="w-full border-none outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2">
          <FaFilter className="text-gray-500 mr-2" />
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="border-none outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left text-gray-600">Order ID</th>
              <th className="p-4 text-left text-gray-600">Customer Name</th>
              <th className="p-4 text-left text-gray-600">Date</th>
              <th className="p-4 text-left text-gray-600">Status</th>
              <th className="p-4 text-left text-gray-600">Total</th>
              <th className="p-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-600">No orders found</td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-lg ${order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : order.status === 'Shipped' ? 'bg-blue-200 text-blue-800' : order.status === 'Delivered' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">{order.total}</td>
                  <td className="p-4 flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700"><FaFileAlt /></button>
                    <button className="text-yellow-500 hover:text-yellow-700"><FaEdit /></button>
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

export default OrderPage;
