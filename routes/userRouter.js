import express from 'express';

const router = express.Router();

import {
  getAllUsers,
  getUser,
  identifyUser,
  rechargeMoney,
  transferMoney,
  updateStatus,
  withdrawMoney,
  updateStatusWithdrawMoney,
  buyMobileCard,
} from '../controllers/userController.js';
import { unauthorizedError } from '../error/index.js';
import { authenticateUser, authorizePermissions } from '../middleware/index.js';
import {
  validateCard,
  validateMoneyRecharge,
} from '../middleware/rechargeCard.js';
import { validateWithdrawCard } from '../middleware/withdrawMoney.js';
import { transferProcess } from '../middleware/transferProcess.js';
router
  .route('/')
  .get(authenticateUser, authorizePermissions(['admin']), getAllUsers);
router
  .route('/:id')
  .get(authenticateUser, authorizePermissions(['admin']), getUser);
router
  .route('/identify/:id')
  .post(authenticateUser, authorizePermissions(['admin']), identifyUser);

router
  .route('/recharge')
  .post(
    authenticateUser,
    authorizePermissions(['user']),
    validateCard,
    validateMoneyRecharge,
    rechargeMoney
  ); // this function will recharge money

//transfer money
// application for website front end use route below and comment line 33 34
// router
//   .route('/transfer')
//   .post(
//     authenticateUser,
//     authorizePermissions(['user']),
//     transferProcess,
//     transferMoney
//   );

// test api for post use route below and comment this route in line 31
router
  .route('/transfer')
  .post(authenticateUser, authorizePermissions(['user']), transferProcess);
router
  .route('/transfer/enterOtp')
  .post(authenticateUser, authorizePermissions(['user']), transferMoney);

// update status history for transfer
router
  .route('/updateStatus/:id')
  .post(authenticateUser, authorizePermissions(['admin']), updateStatus);

//withdraw money
router
  .route('/withdraw')
  .post(
    authenticateUser,
    authorizePermissions(['user']),
    validateWithdrawCard,
    withdrawMoney
  );

router
  .route('/updateStatusWithdrawMoney/:id')
  .post(
    authenticateUser,
    authorizePermissions(['admin']),
    updateStatusWithdrawMoney
  );

// buy mobile card
router
  .route('/buyMobileCard')
  .post(authenticateUser, authorizePermissions(['user']), buyMobileCard);
export default router;
