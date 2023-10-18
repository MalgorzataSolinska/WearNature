import mongoose from 'mongoose';
import User from './User.js';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    firstName: {
      type: String,
      required: true,
      ref: 'User',
    },
    lastName: {
      type: String,
      required: true,
      ref: 'User',
    },
    email: {
      type: String,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
      },
    ],
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      streetName: { type: String, required: true },
      streetNumber: { type: String, required: true },
      postalCode: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      default: false,
    },
    paymentDetails: {
      orderId: { type: String },
      payerId: { type: String },
    },
    shippingPrice: {
      type: Number,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
const Order = mongoose.model('Order', orderSchema);
export default Order;
