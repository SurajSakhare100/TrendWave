import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { FaChartLine, FaChartBar, FaChartPie } from 'react-icons/fa';

// Sample Data
const salesData = [
  { name: 'Jan', Sales: 4000 },
  { name: 'Feb', Sales: 3000 },
  { name: 'Mar', Sales: 2000 },
  { name: 'Apr', Sales: 2780 },
  { name: 'May', Sales: 1890 },
  { name: 'Jun', Sales: 2390 },
  { name: 'Jul', Sales: 3490 },
];

const productData = [
  { name: 'Total Products', value: 14000 },
  { name: 'Sold Out Products', value: 5000 },
];

const categoryData = [
  { name: 'Men', value: 400 },
  { name: 'Women', value: 300 },
  { name: 'Kids', value: 300 },
  { name: 'Accessories', value: 200 },
  { name: 'Others', value: 150 },
];

const COLORS = ['#4F46E5', '#34D399', '#FBBF24', '#F87171', '#9CA3AF'];

const AnalyticsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Analytics Dashboard</h1>
      
      <div className="flex flex-col gap-6">
        
        {/* Sales Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <FaChartLine className="text-3xl text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Sales Over Time</h2>
          </div>
          <LineChart
            width={500}
            height={300}
            data={salesData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Sales" stroke="#4F46E5" />
          </LineChart>
        </div>

        {/* Bar Chart for Total Products and Sold-Out Products */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <FaChartBar className="text-3xl text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Products Overview</h2>
          </div>
          <BarChart
            width={500}
            height={300}
            data={productData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#34D399" />
          </BarChart>
        </div>

        {/* Pie Chart for Product Categories */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <FaChartPie className="text-3xl text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Product Categories</h2>
          </div>
          <PieChart width={500} height={300}>
            <Pie
              data={categoryData}
              cx={250}
              cy={150}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        
      </div>
    </div>
  );
};

export default AnalyticsPage;
