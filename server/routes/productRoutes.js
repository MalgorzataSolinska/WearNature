import express from 'express';
import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import protectRoute from '../middleware/authMiddleware.js';

const productRoutes = express.Router();

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Produkt nie został znaleziony' });
  }
};

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, userId, title } = req.body;

  const product = await Product.findById(req.params.id);
  const user = await User.findById(userId);

  if (product) {
    const alreadyReviewed = product.reviews.find((rev) => rev.user.toString() === user._id.toString());
    if (alreadyReviewed) {
      res.status(400).json({ error: 'Juz dodałeś opinię o tym produkcie ' });
    }
    const review = {
      name: user.firstName,
      rating: Number(rating),
      comment,
      title,
      user: user._id,
    };
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ message: 'Opinia została zapisana ' });
  } else {
    res.status(404).json({ error: 'Produkt nie został znaleziony' });
  }
});


productRoutes.route('/').get(getProducts);
productRoutes.route('/:id').get(getProduct);
productRoutes.route('/reviews/:id').post(protectRoute, createProductReview);

export default productRoutes;
