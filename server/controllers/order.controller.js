import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js'; 
import {ApiError} from '../utils/ApiError.js'; // Import the custom error class
import { ApiResponse } from '../utils/ApiResponse.js';
import axios from "axios";

export const CreateOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    const { userId } = req.params;

    if (!shippingAddress || !shippingAddress.country || !shippingAddress.postalCode || !shippingAddress.city || !shippingAddress.address) {
      throw new ApiError(400, "All shipping address fields are required");
    }

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Save the order in the database
    const newOrder = new Order({
      userId,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
      status: "Processing",
      createdAt: Date.now(),
    });

    const order = await newOrder.save();

    // Clear user's cart
    // await Cart.findOneAndUpdate(
    //   { userId },
    //   { $set: { items: [], totalPrice: 0 } },
    //   { new: true }
    // );

    // If payment method is PayPal, create a PayPal order
    if (paymentMethod === "PayPal") {
      const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // Sandbox API URL
      const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
      const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

      // Get PayPal access token
      const tokenResponse = await axios.post(
        `${PAYPAL_API}/v1/oauth2/token`,
        "grant_type=client_credentials",
        {
          auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_SECRET,
          },
        }
      );
      
      const accessToken = tokenResponse.data.access_token;

      // Create PayPal order
      const paypalOrderResponse = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders`,
        {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD", // Use INR for Indian Rupees
                value: totalPrice.toFixed(2), // Total price in INR
              },
            },
          ],
          application_context: {
            shipping_preference: "NO_SHIPPING", // Skip shipping details if not needed
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      

      const paypalOrder = paypalOrderResponse.data;
      console.log(paypalOrder)

      // Return PayPal approval link to the user
      return res.status(201).json(
        new ApiResponse(
          201,
          {
            orderId: newOrder._id,
            paypalOrderId: paypalOrder.id,
            approvalLink: paypalOrder.links.find(
              (link) => link.rel === "approve"
            )?.href,
          },
          "Order placed successfully. Redirect to PayPal for payment."
        )
      );
    }

    // For other payment methods, just return the order ID
    res.status(201).json(
      new ApiResponse(201, { orderId: newOrder._id }, "Order placed successfully")
    );
  } catch (error) {
    next(error);
  }
};


export const getOrderById = async (req, res, next) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId)
        if (!order) throw new ApiError(404, 'Order not found');

        res.status(200).json( new ApiResponse(201, order,"Order placed successfully" ));
    } catch (error) {
        next(error); 
    }
};

export const getAllOrders = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ userId }).select('-items.productId -userId');
        if (!orders || orders.length === 0) throw new ApiError(404, 'No orders found');

        res.status(200).json(new ApiResponse(200, orders,"Order placed successfully" ));
    } catch (error) {
        next(error); 
    }
};
