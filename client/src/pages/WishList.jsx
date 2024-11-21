import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LikeProduct from '../components/Like Product/LikeProduct';

const WishList = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState(null); // Error state for handling errors

  useEffect(() => {
    const fetchSavedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/products/savedProducts', { withCredentials: true });
        setSavedProducts(response.data.savedProducts);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching saved products:', error.message);
        setError('Failed to load saved products'); 
        setLoading(false);
      }
    };

    fetchSavedProducts();
  }, [savedProducts]); 

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Loading saved products...</div>;
  }

  return (
    <div className="pt-28 pb-10 px-8 sm:px-20 bg-gray-50 dark:bg-black ">
      <h2 className="text-4xl text-center font-semibold mt-2 mb-4 text-black dark:text-white">Your Saved Products</h2>
      
      {error && <p className="text-center text-red-500">{error}</p>} {/* Show error message if any */}
      
      {savedProducts.length > 0 ? (
        <div className="product-list">
          <ul className="shadow-sm dark:shadow-white p-4 rounded-md w-full md:w-2/3 mx-auto border">
            {savedProducts?.map((product) => (
              <li key={product._id} className="flex items-center justify-between mb-4 p-4 border-b border-gray-300">
                <div className="flex gap-4 sm:gap-6">
                  <Link to={`/products/${product._id}`} className="cursor-pointer">
                    <img src={product.image} alt={product.name} className="w-24 h-24 rounded-lg object-cover mr-2" />
                  </Link>
                  <div className="flex flex-col self-start w-full sm:w-3/5">
                    <h2 className="text-black dark:text-white text-md sm:text-lg xs:text-xl font-semibold truncate">{product.name}</h2>
                    <h2 className="text-gray-800 dark:text-white text-sm truncate">{product.description.slice(0, 20)} ...</h2>
                    <p className="text-black dark:text-gray-400">Price: {product.price.toFixed(2)} RS</p>
                  </div>
                </div>
                <LikeProduct productId={product._id} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-600">No saved products found.</p>
      )}
    </div>
  );
};

export default WishList;
