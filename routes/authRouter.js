import express from 'express';

const router = express.Router();

import {
  login,
  register,
  updateUser,
  forgotPassword,
} from '../controllers/authController.js';

router.route('/register').post(register);
router.route('/login').post(login);

export default router;
