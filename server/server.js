import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth/auth.route.js";
import adminProductsRouter from "./routes/admin/products.route.js";
import adminOrderRouter from "./routes/admin/order.route.js";
import adminAnalyticsRouter from "./routes/admin/analytics.route.js";
import shopProductsRouter from "./routes/shop/products.route.js";
import shopCartRouter from "./routes/shop/cart.route.js";
import shopAddressRouter from "./routes/shop/address.route.js";
import shopOrderRouter from "./routes/shop/order.route.js";
import shopSearchRouter from "./routes/shop/search.route.js";
import shopReviewRouter from "./routes/shop/review.route.js";
import shopFeatureRouter from "./routes/shop/feature.route.js";
import dotenv from 'dotenv';
import connectDB from "./DB/index.js";
dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
   
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin/products", adminProductsRouter);
app.use("/api/v1/admin/orders", adminOrderRouter);
app.use("/api/v1/admin/analytics", adminAnalyticsRouter);

app.use("/api/v1/shop/products", shopProductsRouter);
app.use("/api/v1/shop/cart", shopCartRouter);
app.use("/api/v1/shop/address", shopAddressRouter);
app.use("/api/v1/shop/order", shopOrderRouter);
app.use("/api/v1/shop/search", shopSearchRouter);
app.use("/api/v1/shop/review", shopReviewRouter);
app.use("/api/v1/common/feature", shopFeatureRouter);


connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️  Server is running at port: ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });