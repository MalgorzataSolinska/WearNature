import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import protectRoute from '../middleware/authMiddleware.js';
import Order from '../models/Order.js';
import { sendVerificationEmail } from '../middleware/sendVerificationEmail.js';
import { sendPasswordResetEmail } from '../middleware/sendPasswordResetEmail.js';

const userRoutes = express.Router();
const genToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      active: user.active,
      token: genToken(user._id),
      created: user.createdAt,
    });
  } else {
    res.status(401).json({ error: 'Niepoprawny email lub hasło.' });
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ error: 'Istnieje już konto zarejestrowane na ten adres email.' });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  const newToken = genToken(user._id);

  sendVerificationEmail(newToken, email, firstName);

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
      active: user.active,
      createdAt: user.createdAt,
    });
  } else {
    res.json(400).json({ error: 'Wprowadzone dane są niepoprawne. ' });
  }
});

// verify email
const verifyEmail = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (user) {
      user.active = true;
      await user.save();
      res.json('Dziękujemy za potwierdenie i aktywację konta.');
    } else {
      res.status(404).send('Użytkownik nie został znaleziony.');
    }
  } catch (error) {
    res.status(401).send('Email nie został potwierdzony. Spróbuj ponownie.');
  }
});

// password reset request
const passwordResetRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const newToken = genToken(user._id);
      sendPasswordResetEmail(newToken, user.email, user.firstName);
      res.status(200).send('Na podany adres email została wysłana wiadomość z instrukcją zmiany hasła.');
    }
  } catch (error) {
    res.status(401).send('Nie ma w bazie konta z tym adresem email');
  }
});

//password reset
const passwordReset = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (user) {
      user.password = req.body.password;
      await user.save();
      res.json('Twoje hasło zostało zaktualizowane.');
    } else {
      res.status(404).send('Użytkownik nie został znaleziony.');
    }
  } catch (error) {
    res.status(401).send('Nie udało się zmienić hasła. Spróbuj później.');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const isCurrentPasswordValid = await user.matchPasswords(req.body.currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ error: 'Aktualne hasło jest niepoprawne' });
    }
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genToken(updatedUser._id),
      createdAt: updatedUser.createdAt,
    });
  } else {
    res.status(404).json({ error: 'Użytkownik nie został znaleziony.' });
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  if (orders) {
    res.json(orders);
  } else {
    res.status(404).json({ error: 'Brak historii zamówień.' });
  }
});

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/verify-email').get(verifyEmail);
userRoutes.route('/password-reset-request').post(passwordResetRequest);
userRoutes.route('/password-reset').post(passwordReset);
userRoutes.route('/profile/:id').put(protectRoute, updateUserProfile);
userRoutes.route('/:id').get(protectRoute, getUserOrders);
export default userRoutes;
