import { fetchWishlist } from '@/store/shop/wishlist-slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const WishlistPage = ({ userId }) => {
  const dispatch = useDispatch();
  const { wishlist, isLoading } = useSelector((state) => state);
  const products = wishlist?.products || []; 
  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [dispatch, userId]);

  if (isLoading) {
    return <p>Loading your wishlist...</p>;
  }

  return (
    <div>
      <h2>My Wishlist</h2>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
          </div>
        ))
      ) : (
        <p>Your wishlist is empty!</p>
      )}
    </div>
  );
};
