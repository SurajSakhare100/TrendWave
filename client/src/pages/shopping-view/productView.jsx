import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { fetchProductDetails } from '@/store/shop/products-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function ProductView() {
    const [product, setProduct] = useState(null)
    const { id } = useParams()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (id == null) return;
        const fetchProduct = async () => {
            const data = await dispatch(fetchProductDetails(id));
            setProduct(data.payload.data);
        };
        fetchProduct();

    }, [id])
    function handleAddtoCart(getCurrentProductId) {
        dispatch(
          addToCart({
            userId: user?._id,
            productId: getCurrentProductId,
            quantity: 1,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchCartItems(user?._id));
            toast({
              title: "Product is added to cart",
            });
          }
        });
      }
    return (
        <div className="mx-auto py-10 mt-16 bg-white dark:bg-black">
            <div className="flex flex-col sm:flex-row max-w-6xl gap-12 justify-between mx-auto">
                <div className="max-w-2xl w-1/2">
                    <img
                        src={product?.image}
                        alt={product?.name || 'Product image'}
                        className="w-full object-cover mx-auto shadow-sm cursor-pointer mb-4"
                    />
                </div>
                <div className="">
                    <div className="flex justify-end">
                        {/* <LikeProduct productId={product?._id} className="text-xl" /> */}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-black dark:text-white">{product?.name}</h1>
                    <p className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">${product?.price?.toFixed(2)}</p>

                    <p className="text-gray-800 dark:text-gray-300 mb-4">{product?.description}</p>


                    {/* <CardFooter> */}
                        {product?.totalStock === 0 ? (
                            <Button className="w-full opacity-60 cursor-not-allowed">
                                Out Of Stock
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
                                className="w-60"
                            >
                                Add to cart
                            </Button>
                        )}
                    {/* </CardFooter> */}


                </div>
            </div>

            <div className="mt-16 border-b dark:border-gray-700">
                <ul className="flex space-x-6 text-md font-semibold text-gray-600 dark:text-gray-400">
                    <li className="border-b-2 border-blue-600 py-3 px-6">Description</li>
                    <li className="py-3 px-6">Reviews (0)</li>
                </ul>
            </div>

            <div className="py-8 text-gray-700 dark:text-gray-300">
                <h2 className="text-lg mb-4 font-medium">Product Details</h2>
                <p>
                    {product?.description || 'Detailed description of the product will be available soon.'}
                </p>
            </div>
        </div>
    )
}

export default ProductView
