import express from 'express';
import { getSalesOverview, getProductPerformance, getLowStockProducts, getCustomerInsights, getOrderSummary } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/total-sales', getSalesOverview);  // Home dashboard view with sales overview
router.get('/product-performance', getProductPerformance); // Show top products
router.get('/low-stock', getLowStockProducts); // Low stock products
router.get('/customer-insights', getCustomerInsights); // Customer insights
router.get('/order-summary', getOrderSummary); // Orders summary by status

export default router;
