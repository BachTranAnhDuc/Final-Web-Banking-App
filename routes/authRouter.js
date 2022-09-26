import express from 'express';

const router = express.Router();

import {
  login,
  register,
  updateUser,
  forgotPassword,
  verifyEmail,
  logout,
  firstLogin,
  uploadUserImage1,
} from '../controllers/authController.js';

import { unauthorizedError } from '../error/index.js';
import { authenticateUser, authorizePermissions } from '../middleware/index.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/verify-email').post(verifyEmail);
router.route('/logout').post(logout);
router.route('/first-login').post(authenticateUser, firstLogin);
router.route('/upload').post(uploadUserImage1);

export default router;
