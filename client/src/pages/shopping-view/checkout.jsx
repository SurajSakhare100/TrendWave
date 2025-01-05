import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { capturePayment, createNewOrder } from "@/store/shop/order-slice";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  
  const dispatch = useDispatch();
  const { toast } = useToast();


  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?._id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: selectedPaymentMethod,
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    
    if (selectedPaymentMethod === 'paypal') {
      setIsPaymentStart(true);
      dispatch(createNewOrder(orderData)).then((data) => {
        if (data?.payload?.success) {
          window.location.href = data.payload.approvalURL;
        } else {
          setIsPaymentStart(false);
          toast({
            title: 'Error initiating PayPal payment. Please try again.',
            variant: 'destructive',
          });
        }
      });
    } else if (selectedPaymentMethod === 'cod') {
      dispatch(createNewOrder(orderData)).then((data) => {
        if (data?.payload?.success) {
         
          dispatch(capturePayment({orderId:data.payload.orderId,paymentMethod:selectedPaymentMethod} )).then((data) => {
            if (data?.payload?.success) {
              sessionStorage.removeItem("currentOrderId");
              window.location.href = "/shop/payment-success";
            }
          });
          toast({
            title: 'Order placed successfully with Cash on Delivery.',
            variant: 'success',
          });
        } else {
          toast({
            title: 'Error placing order. Please try again.',
            variant: 'destructive',
          });
        }
      });
  }}

 const handlePaypal=(()=>{
    toast({
      title: 'Paypal Option is Off For Some Reason Now.',
      variant: 'destructive',
    });
  })

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-4 items-center">
            <div>
              <input
                type="radio"
                value="cod"
                name="paymentMethod"
                checked={selectedPaymentMethod === 'cod'}
                onChange={handlePaymentMethodChange}
                className="cursor-pointer"
              />
              <label htmlFor="cod" className="ml-2">Cash on Delivery (COD)</label>
            </div>
            <div className="">
              <input
                type="radio"
                value="paypal"
                name="paymentMethod"
                disabled
                checked={selectedPaymentMethod === 'paypal'}
                onChange={handlePaymentMethodChange}
                className="cursor-pointer"
                onClick={handlePaypal}
              />
              <label htmlFor="paypal" className="ml-2">PayPal</label>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePayment} className="w-full">
              {isPaymentStart && selectedPaymentMethod === 'paypal'
                ? 'Processing PayPal Payment...'
                : selectedPaymentMethod === 'paypal'
                ? 'Checkout with PayPal'
                : 'Place Order'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
