import { fetchWishlist } from '@/store/shop/wishlist-slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const WishlistPage = ({ userId }) => {
  const dispatch = useDispatch();
  const { wishlists, isLoading } = useSelector((state) => state.Wishlist);
  const products = wishlists?.products || [];

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [dispatch, userId]);

  if (isLoading) {
    return (
      <div className="text-center mt-20">
        <p className="text-lg text-gray-600">Loading your wishlist...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">My Wishlist</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
            >
              <img
                src={product.image || '/default-product-image.jpg'}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-medium text-gray-800 mb-2">{product.name}</h3>
              <p className="text-lg font-semibold text-gray-600 mb-4">${product.price}</p>
              <button className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8">Your wishlist is empty!</p>
      )}
    </div>
  );
};
