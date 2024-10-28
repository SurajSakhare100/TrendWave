import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const LikeProduct = ({ productId ,...props}) => {
  const savedProducts = useSelector((state) => state.user.savedProducts);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if the product is in the savedProducts array
    const isProductSaved = savedProducts.includes(productId);
    setIsSaved(isProductSaved);
  }, [savedProducts, productId]);

  const handleSaveProduct = async () => {
    try {
      if (isSaved) {
        await axios.delete(`http://localhost:5000/api/v1/products/save/${productId}`, { withCredentials: true });
        setIsSaved(false);
      } else {
        await axios.post(`http://localhost:5000/api/v1/products/save/${productId}`, {}, { withCredentials: true });
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error saving product:', error.message);
    }
  };

  return (
    <div className="product-card mt-12" {...props}>
      <button onClick={handleSaveProduct}>
        <FaHeart className={isSaved ? 'text-red-500' : ''} />
      </button>
    </div>
  );
};

export default LikeProduct;
