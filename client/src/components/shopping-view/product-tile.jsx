import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { WishlistButton } from "./wishlistButton";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
  userId,
  updateWishlist
}) {

  return (
    <Card className="w-full max-w-sm mx-auto" key={product?._id}>
      <div >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[340px] object-cover "
            onClick={() => window.location.href = `product/${product._id}`}
          />
          <div className="absolute top-0 right-1">
            <WishlistButton product={product} userId={userId} updateWishlist={updateWishlist}/>
          </div>
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product?.bestseller ? (
              <Badge className="bg-green-500 hover:bg-green-600">
                BestSeller
              </Badge>
            ) : null}
            {product?.totalStock === 0 ? (
              <Badge className="bg-red-500 hover:bg-red-600">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="bg-red-500 hover:bg-red-600">
                {`Only ${product?.totalStock} items left`}
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="bg-blue-500 text-xs hover:bg-red-600">
                Sale
              </Badge>
            ) : null}
            
          </div>
        </div>

        <CardContent className="py-4">
          {/* <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div> */}
          <div className="flex justify-between items-center ">
          <div className="flex items-center">
          <p className="text-xl font-bold mb-2 capitalize">{product?.title}</p>
          </div>
           <div className="flex gap-2 items-center">
           <span
              className={`${product?.salePrice > 0 ? "line-through" : ""
                } text-xl font-semibold text-gray-700`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-xl font-bold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
           </div>
          </div>
          <h4 className="text-md font-senibold mb-2">{product?.description?.slice(0,30)+ '...'}</h4>

        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
