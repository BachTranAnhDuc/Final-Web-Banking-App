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
  enterOTPForgotPass,
  uploadUserImage1,
  changePassword,
  changeNewPasswordAfterLogin,
} from '../controllers/authController.js';

import { unauthorizedError } from '../error/index.js';
import { authenticateUser, authorizePermissions } from '../middleware/index.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/verify-email').post(verifyEmail);
router.route('/logout').post(logout);
router.route('/first-login').post(authenticateUser, firstLogin);
router.route('/upload').post(updateUser);
router.route('/forgotPassword').post(forgotPassword); // this function will random OTP and send this OTP to user
router.route('/enterOTP').post(enterOTPForgotPass); // this function get OTP input and check in database this OTP is valid then change pass
router.route('/changePwd').post(changePassword);
router
  .route('/changeNewPasswordAfterLogin')
  .post(authenticateUser, changeNewPasswordAfterLogin);

export default router;
