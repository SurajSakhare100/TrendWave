import React from 'react';
import { FaShoppingCart, FaStar, FaBoxOpen, FaBell, FaTag, FaBox, FaUsers } from 'react-icons/fa';

// Sample Data
const recentOrders = [
  { id: 'ORD12345', date: '2024-09-15', amount: '$120.00', status: 'Completed' },
  { id: 'ORD12346', date: '2024-09-14', amount: '$89.50', status: 'Shipped' },
  { id: 'ORD12347', date: '2024-09-13', amount: '$45.00', status: 'Pending' },
];

const topSellingProducts = [
  { name: 'Men\'s Jacket', sales: 300 },
  { name: 'Women\'s Dress', sales: 250 },
  { name: 'Kids\' T-Shirt', sales: 200 },
];

const customerFeedback = [
  { customer: 'John Doe', feedback: 'Great quality! Will buy again.', rating: 5 },
  { customer: 'Jane Smith', feedback: 'Good service, but delivery was delayed.', rating: 3 },
];

const stockAlerts = [
  { product: 'Men\'s Jacket', stock: 5 },
  { product: 'Women\'s Dress', stock: 3 },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Dashboard</h1>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Total Sales This Month</h2>
            <p className="text-2xl font-bold text-gray-900">$12,345</p>
          </div>
          <FaShoppingCart className="text-3xl text-green-500" />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Total Revenue</h2>
            <p className="text-2xl font-bold text-gray-900">$78,900</p>
          </div>
          <FaTag className="text-3xl text-blue-500" />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Products in Stock</h2>
            <p className="text-2xl font-bold text-gray-900">4,567</p>
          </div>
          <FaBox className="text-3xl text-purple-500" />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">New Customers</h2>
            <p className="text-2xl font-bold text-gray-900">123</p>
          </div>
          <FaUsers className="text-3xl text-red-500" />
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
          <ul className="space-y-4">
            {recentOrders.map(order => (
              <li key={order.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <p className="font-semibold text-gray-800">Order ID: {order.id}</p>
                  <p className="text-gray-600">Date: {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-semibold">{order.amount}</p>
                  <p className={`text-sm ${order.status === 'Completed' ? 'text-green-600' : order.status === 'Shipped' ? 'text-blue-600' : 'text-yellow-600'}`}>
                    {order.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Selling Products</h2>
          <ul className="space-y-4">
            {topSellingProducts.map(product => (
              <li key={product.name} className="flex justify-between items-center border-b py-2">
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-gray-600">{product.sales} units sold</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Feedback */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Feedback</h2>
          <ul className="space-y-4">
            {customerFeedback.map(feedback => (
              <li key={feedback.customer} className="border-b py-2">
                <p className="font-semibold text-gray-800">{feedback.customer}</p>
                <p className="text-gray-600">{feedback.feedback}</p>
                <p className="text-yellow-500">Rating: {Array(feedback.rating).fill('⭐').join('')}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Stock Alerts */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Stock Alerts</h2>
          <ul className="space-y-4">
            {stockAlerts.map(alert => (
              <li key={alert.product} className="flex justify-between items-center border-b py-2">
                <p className="font-semibold text-gray-800">{alert.product}</p>
                <p className={`text-red-500 font-semibold`}>Only {alert.stock} left</p>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
