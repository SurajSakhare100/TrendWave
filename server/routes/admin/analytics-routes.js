// Routes
const express = require('express');
const { analyticsController } = require('../../controllers/admin/analytics-controller');
const { authMiddleware } = require('../../middleware/auth');
const router = express.Router();


router.get('/revenue',authMiddleware, analyticsController.getTotalRevenue);
router.get('/orders',authMiddleware, analyticsController.getTotalOrders);
router.get('/top-products',authMiddleware, analyticsController.getTopSellingProducts);
router.get('/users',authMiddleware, analyticsController.getTotalUsers);
router.get('/orders-status',authMiddleware, analyticsController.getOrdersByStatus);
router.get('/revenue-date',authMiddleware, analyticsController.getRevenueByDate);
router.get('/average-order',authMiddleware, analyticsController.getAverageOrderValue);
router.get('/user-growth',authMiddleware, analyticsController.getUserGrowth);
router.get('/product-performance',authMiddleware, analyticsController.getProductPerformance);
module.exports = router;