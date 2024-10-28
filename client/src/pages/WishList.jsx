import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LikeProduct from '../components/Like Product/LikeProduct';

const WishList = () => {
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    const fetchSavedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/products/savedProducts', { withCredentials: true });
        setSavedProducts(response.data.savedProducts);
      } catch (error) {
        console.error('Error fetching saved products:', error.message);
      }
    };

    fetchSavedProducts();
  }, []);

  return (
    <div className="mt-28 px-20" >
      <h2 className='text-4xl text-center font-semibold mt-2 mb-4'>Your Saved Products</h2>
      {savedProducts.length > 0 ? (
        <div className="product-list">
           {
            <ul>
            {savedProducts?.map((product) => (
              <li key={product._id} className="flex items-center justify-between mb-4 p-4 border shadow-sm ">
                <Link
                 to={`/products/${product._id}`} className='cursor-pointer'><img src={product.image} alt={product.name} className="w-20 h-20 object-contain mr-2" /></Link>
                <div className="flex-grow self-start">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-700">Price: {product.price.toFixed(2)} RS</p>
                </div>
                <LikeProduct productId={product._id}/>
              </li>
            ))}
          </ul>
        }
        </div>
       
      ) : (
        <p>No saved products found.</p>
      )}
    </div>
  );
};

export default WishList;
