import express from 'express';

const router = express.Router();

import {
  login,
  register,
  updateUser,
  forgotPassword,
  verifyEmail,
  logout,
} from '../controllers/authController.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/verify-email').post(verifyEmail);
router.route('/logout').post(logout);

export default router;
