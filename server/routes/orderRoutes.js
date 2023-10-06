import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import protectRoute from '../middleware/authMiddleware.js';

const orderRoutes = express.Router();

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice, paymentDetails, userInfo } = req.body;
  if (orderItems && orderItems.length === 0) {
    throw new Error('Brak produktów w koszyku.');
  } else {
    const order = new Order({
      orderItems,
      user: userInfo._id,
      username: userInfo.name,
      email: userInfo.email,
      shippingAddress,
      paymentMethod,
      paymentDetails,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});
orderRoutes.route('/').post(protectRoute, createOrder);

export default orderRoutes;
