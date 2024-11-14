import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getSalesOverview = async (req, res) => {
    try {
        console.log("object")
        const totalSales = await Order.aggregate([
            {
                $match: {
                    status: 'Completed'   }
            },
            {
                $group: {
                    totalSales: { $sum: "$totalPrice" }  }
            },
            {
                $sort: { _id: 1 }       }
        ]);
        res.json({
            status: "success", // Indicate the success status
            data: totalSales // Include the actual data
        });
    } catch (error) {
        res.status(500).json({
            status: "error", // Indicate the error status
            message: "Server Error"
        });
    }
};

export const getProductPerformance = async (req, res) => {
    try {
        const topProducts = await Product.find().sort({ sold: -1 }).limit(5);
        res.json({
            status: "success", // Indicate the success status
            data: topProducts // Include the top products data
        });
    } catch (error) {
        res.status(500).json({
            status: "error", // Indicate the error status
            message: error.message
        });
    }
};

export const getLowStockProducts = async (req, res) => {
    try {
        const lowStockProducts = await Product.find({ stock: { $lt: 5 } });
        res.json({
            status: "success", // Indicate the success status
            data: lowStockProducts // Include the low stock products data
        });
    } catch (error) {
        res.status(500).json({
            status: "error", // Indicate the error status
            message: error.message
        });
    }
};

export const getCustomerInsights = async (req, res) => {
    try {
        const totalCustomers = await User.countDocuments();
        const newCustomers = await User.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        });
        res.json({
            status: "success", // Indicate the success status
            data: { totalCustomers, newCustomers } // Include the customer insights data
        });
    } catch (error) {
        res.status(500).json({
            status: "error", // Indicate the error status
            message: error.message
        });
    }
};

export const getOrderSummary = async (req, res) => {
    try {
        const orderSummary = await Order.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        res.json({
            status: "success", // Indicate the success status
            data: orderSummary // Include the order summary data
        });
    } catch (error) {
        res.status(500).json({
            status: "error", // Indicate the error status
            message: error.message
        });
    }
};
