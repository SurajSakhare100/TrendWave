const Order = require("../../models/Order");
const Product = require("../../models/Product");
const User = require("../../models/User");


// Analytics Controller
const analyticsController = {
  // Total Revenue
  getTotalRevenue:async(req, res) => {
    try {
      const orders = await Order.find({ paymentStatus: "paid" });
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      res.status(200).json({ totalRevenue });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch total revenue" });
    }
  },

  // Total Orders
  getTotalOrders: async (req, res) => {
    try {
      const totalOrders = await Order.countDocuments();
      res.status(200).json({ totalOrders });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch total orders" });
    }
  },

  // Top-Selling Products
  getTopSellingProducts: async (req, res) => {
    try {
      const products = await Product.find().sort({ totalStock: -1 }).limit(5);
      res.status(200).json({ topSellingProducts: products });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch top-selling products" });
    }
  },

  // Total Users
  getTotalUsers: async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      res.status(200).json({ totalUsers });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch total users" });
    }
  },

  // Orders by Status
  getOrdersByStatus: async (req, res) => {
    try {
      const statuses = await Order.aggregate([
        { $group: { _id: "$orderStatus", count: { $sum: 1 } } },
      ]);
      res.status(200).json({ ordersByStatus: statuses });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders by status" });
    }
  },

  // Revenue by Date Range
  getRevenueByDate: async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
      const orders = await Order.find({
        paymentStatus: "paid",
        orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      res.status(200).json({ revenue });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch revenue by date" });
    }
  },

  // Average Order Value
  getAverageOrderValue: async (req, res) => {
    try {
      const orders = await Order.find({ paymentStatus: "paid" });
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
      res.status(200).json({ averageOrderValue });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch average order value" });
    }
  },

  // User Growth Over Time
  getUserGrowth: async (req, res) => {
    try {
      const users = await User.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      res.status(200).json({ userGrowth: users });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user growth" });
    }
  },

  // Product Performance
  getProductPerformance: async (req, res) => {
    try {
      const products = await Product.find().select("title totalStock price bestseller averageReview");
      res.status(200).json({ productPerformance: products });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product performance" });
    }
  },
};


module.exports = {
 analyticsController
};

