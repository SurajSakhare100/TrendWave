import { addToWishlist, removeFromWishlist } from '@/store/shop/wishlist-slice';
import { useDispatch } from 'react-redux';

export const WishlistButton = ({ product, userId, wishlist }) => {
  const dispatch = useDispatch();
  const isWishlisted = wishlist?.includes(product._id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(userId, product._id));
    } else {
      dispatch(addToWishlist(userId, product._id));
    }
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleWishlistToggle}>
        {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  );
};
