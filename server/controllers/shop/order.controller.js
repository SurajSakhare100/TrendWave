import paypal from "../../helpers/paypal.js";
import { Cart } from "../../models/Cart.model.js";
import { Order } from "../../models/Order.model.js";
import { Product } from "../../models/Product.model.js";

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod, // PayPal or COD
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // If paymentMethod is PayPal, create PayPal payment
    if (paymentMethod === "paypal") {
      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: `${process.env.FRONTEND_URL}/shop/paypal-return`,
          cancel_url: `${process.env.FRONTEND_URL}/shop/paypal-cancel`,
        },
        transactions: [
          {
            item_list: {
              items: cartItems.map((item) => ({
                name: item.title,
                sku: item.productId,
                price: item.price.toFixed(2),
                currency: "USD",
                quantity: item.quantity,
              })),
            },
            amount: {
              currency: "USD",
              total: totalAmount.toFixed(2),
            },
            description: "description",
          },
        ],
      };

      paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
        if (error) {
          console.log(error);

          return res.status(500).json({
            success: false,
            message: "Error while creating PayPal payment",
          });
        } else {
          const newlyCreatedOrder = new Order({
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
          });

          await newlyCreatedOrder.save();

          const approvalURL = paymentInfo.links.find(
            (link) => link.rel === "approval_url"
          ).href;

          res.status(201).json({
            success: true,
            approvalURL,
            orderId: newlyCreatedOrder._id,
          });
        }
      });
    } else if (paymentMethod === "cod") {
      // If payment method is COD, just create the order without PayPal interaction
      const newlyCreatedOrder = new Order({
        userId,
        cartId,
        cartItems,
        addressInfo,
        orderStatus: "pending", // You can modify the status to something like "pending" for COD
        paymentMethod: "cod",
        paymentStatus: "pending", // COD payment status will be "pending"
        totalAmount,
        orderDate,
        orderUpdateDate,
        paymentId: null, // No paymentId needed for COD
        payerId: null, // No payerId for COD
      });

      await newlyCreatedOrder.save();

      res.status(201).json({
        success: true,
        message: "Order created with COD payment method",
        orderId: newlyCreatedOrder._id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId, paymentMethod } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cannot be found",
      });
    }

    // Handling PayPal Payment
    if (paymentMethod === "paypal") {
      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";
      order.paymentId = paymentId;
      order.payerId = payerId;
    } 
    // Handling COD Payment
    else if (paymentMethod === "cod") {
      order.paymentStatus = "paid"; // COD payment status is "paid" when confirmed
      order.orderStatus = "confirmed";
      order.paymentId = null; // No paymentId for COD
      order.payerId = null; // No payerId for COD
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // Loop through cart items to update product stock
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${item.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};


const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
