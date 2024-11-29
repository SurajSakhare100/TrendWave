import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js'; 
import {ApiError} from '../utils/ApiError.js'; // Import the custom error class
import { ApiResponse } from '../utils/ApiResponse.js';

export const CreateOrder = async (req, res, next) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;
        let { userId } = req.params;

        if (!shippingAddress || !shippingAddress.country || !shippingAddress.postalCode || !shippingAddress.city || !shippingAddress.address) {
            throw new ApiError(400, 'All shipping address fields are required');
        }

        const newOrder = new Order({
            userId, 
            items,
            shippingAddress,
            paymentMethod,
            totalPrice: items.reduce((acc, item) => acc + item.price * item.quantity, 0), 
            status: 'Processing',  
            createdAt: Date.now()
        });

        const order = await newOrder.save();

        await Cart.findOneAndUpdate(
            { userId },
            { $set: { items: [], totalPrice: 0 } }, 
            { new: true }
        );

        res.status(201).json( new ApiResponse(201, newOrder._id, "Order placed successfully"));
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
