import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

const LikeProduct = ({ productId, ...props }) => {
  const savedProducts = useSelector((state) => state.user?.savedProducts || []);
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsSaved(savedProducts.includes(productId));
  }, [savedProducts, productId]);

  const handleSaveProduct = useCallback(async () => {
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
  }, [isSaved, productId]);

  return (
    <div className="product-card mt-12" {...props}>
      <button onClick={handleSaveProduct} aria-label={isSaved ? 'Unsave product' : 'Save product'}>
        <FaHeart
          className={`${isSaved ? 'text-red-500 hover:text-gray-400' : 'hover:text-red-400'}`}
        />
      </button>
    </div>
  );
};

export default LikeProduct;
