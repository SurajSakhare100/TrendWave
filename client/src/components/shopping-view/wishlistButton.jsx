import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { addToWishlist, removeFromWishlist, fetchWishlist } from '@/store/shop/wishlist-slice';
import { useDispatch, useSelector } from 'react-redux';

export const WishlistButton = ({ product, userId ,updateWishlist}) => {
  const dispatch = useDispatch();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const { products = [] } = useSelector((state) => state.Wishlist.products);
  useEffect(()=>{
    const data=products?.some((p)=>product?._id===p._id)
    setIsInWishlist(data)
  },[])



  const handleWishlistToggle = async () => {
    if (!userId) {
      console.error('User ID is required to update the wishlist.');
      return;
    }

    setLoading(true);
    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist({ userId, productId: product?._id }))
        setIsInWishlist(false);
      } else {
        await dispatch(addToWishlist({ userId, productId: product._id }))
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error.message || error);
    } finally {
      setLoading(false);
      updateWishlist();
      fetchWishlist(userId)
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      disabled={loading}
      className={`p-2 rounded-full transition-all duration-200 ${
        loading ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-600'
      }`}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {loading ? (
        <div
          className="animate-spin w-6 h-6 border-2 border-t-2 border-t-red-600 border-transparent rounded-full"
          aria-hidden="true"
        />
      ) : (
        <Heart
          className={`w-6 h-6 ${isInWishlist ? 'text-red-600 fill-current' : 'text-gray-500'}`}
          aria-hidden="true"
        />
      )}
    </button>
  );
};
