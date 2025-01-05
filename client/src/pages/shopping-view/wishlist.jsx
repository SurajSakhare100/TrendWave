import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { toast } from '@/components/ui/use-toast';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { fetchWishlist } from '@/store/shop/wishlist-slice';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const WishlistPage = ({ userId }) => {
  const dispatch = useDispatch();

  const { products = [] } = useSelector((state) => state.Wishlist.products);
  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId)); 
    }
  }, [dispatch, userId]); 
  const updateWishlist = useCallback(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [dispatch, userId]);
 function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: userId,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(userId));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        My Wishlist
      </h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products?.map((product) => (
            <ShoppingProductTile
              key={product._id}
              product={product}
              userId={userId}
              updateWishlist={updateWishlist} 
              handleAddtoCart={handleAddtoCart}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8">
          Your wishlist is empty!
        </p>
      )}
    </div>
  );
};
