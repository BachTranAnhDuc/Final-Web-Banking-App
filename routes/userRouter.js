import express from 'express';

const router = express.Router();

import {
  getAllUsers,
  getUser,
  identifyUser,
  rechargeMoney,
  transferMoney,
  withdrawMoney,
  buyMobileCard,
  getUserByPhone,
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
  //   .get(authenticateUser, authorizePermissions(['admin']), getUser);
  // router
  .get(authenticateUser, getUser);
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

//withdraw money
router
  .route('/withdraw')
  .post(
    authenticateUser,
    authorizePermissions(['user']),
    validateWithdrawCard,
    withdrawMoney
  );

// buy mobile card
router
  .route('/buyMobileCard')
  .post(authenticateUser, authorizePermissions(['user']), buyMobileCard);

router.route('/getUserByPhone/:phone').get(getUserByPhone);
export default router;
