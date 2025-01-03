import { addToWishlist, fetchWishlist, removeFromWishlist } from '@/store/shop/wishlist-slice';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export const WishlistButton = ({ product, userId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  // Fetch wishlist products from Redux state and ensure it's always an array
  const { products = [] } = useSelector((state) => state.Wishlist);
  
  // Remove undefined or null products from the array before checking if the product exists
  const filteredProducts = products.filter((p) => p !== undefined && p !== null);

  // Check if the current product is already in the wishlist
  const isProductInWishlist = filteredProducts?.some((p) => p._id === product._id);

  const handleWishlistToggle = async () => {
    setLoading(true);

    try {
      if (isProductInWishlist) {
        await dispatch(removeFromWishlist({ userId, productId: product._id }));
      } else {
        await dispatch(addToWishlist({ userId, productId: product._id }));
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [userId, dispatch]);

  return (
    <div>
      <button
        onClick={handleWishlistToggle}
        disabled={loading}
        className={`p-2 rounded-full transition-all duration-200 
          ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-600'}`}
        aria-label={isProductInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {loading ? (
          <div className="animate-spin w-6 h-6 border-t-2 border-red-600 rounded-full border-t-transparent" />
        ) : (
          <Heart
            className={`w-6 h-6 ${isProductInWishlist ? 'text-red-600 fill-current' : 'text-gray-500'}`}
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
};
