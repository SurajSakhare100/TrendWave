import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons

const ProductList = ({ products }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Inventory</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{`$${product.price.toFixed(2)}`}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      product.stock > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  {/* Edit Button with Icon */}
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEdit className="inline-block" /> Edit
                  </button>

                  {/* Delete Button with Icon */}
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrashAlt className="inline-block" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Example product data
const products = [
  {
    id: 1,
    name: 'Summer Dress',
    category: 'Women',
    price: 49.99,
    stock: 12,
    image: 'https://example.com/summer-dress.jpg',
  },
  {
    id: 2,
    name: 'Men’s Jacket',
    category: 'Men',
    price: 79.99,
    stock: 0,
    image: 'https://example.com/mens-jacket.jpg',
  },
  // Add more products here...
];

const App = () => <ProductList products={products} />;

export default App;
