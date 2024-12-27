const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminAnalyticsRouter = require("./routes/admin/analytics-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");
require('dotenv').config();
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
