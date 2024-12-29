import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth/auth-routes.js";
import adminProductsRouter from "./routes/admin/products-routes.js";
import adminOrderRouter from "./routes/admin/order-routes.js";
import adminAnalyticsRouter from "./routes/admin/analytics-routes.js";
import shopProductsRouter from "./routes/shop/products-routes.js";
import shopCartRouter from "./routes/shop/cart-routes.js";
import shopAddressRouter from "./routes/shop/address-routes.js";
import shopOrderRouter from "./routes/shop/order-routes.js";
import shopSearchRouter from "./routes/shop/search-routes.js";
import shopReviewRouter from "./routes/shop/review-routes.js";

import commonFeatureRouter from "./routes/common/feature-routes.js";
import dotenv from 'dotenv';
dotenv.config();


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use("/api/v1/common/feature", commonFeatureRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
