import express from 'express';

const router = express.Router();

import {
  getAllUsers,
  getUser,
  identifyUser,
  rechargeMoney,
  transferMoney,
  updateStatus
} from '../controllers/userController.js';
import { unauthorizedError } from '../error/index.js';
import { authenticateUser, authorizePermissions } from '../middleware/index.js';
import {validateCard, validateMoneyRecharge } from '../middleware/rechargeCard.js'
import {transferProcess} from '../middleware/transferProcess.js'
router
  .route('/')
  .get(authenticateUser, authorizePermissions(['admin']), getAllUsers);
router
  .route('/:id')
  .get(authenticateUser, authorizePermissions(['admin']), getUser);
router
  .route('/identify/:id')
  .post(authenticateUser, authorizePermissions(['admin']), identifyUser);

router.route('/recharge').post(authenticateUser, authorizePermissions(['user']),validateCard,validateMoneyRecharge,rechargeMoney); // this function will recharge money

//transfer money
router.route('/transfer').post(authenticateUser, authorizePermissions(['user']),transferProcess, transferMoney);

// update status history for transfer 
router.route("/updateStatus").post(authenticateUser, authorizePermissions(['admin']),updateStatus)


export default router;
