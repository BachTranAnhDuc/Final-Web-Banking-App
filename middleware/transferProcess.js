import History from '../models/History.js';
import User from '../models/User.js';
import uniqueRandom from 'unique-random';
import sendOTP from '../utils/sendOTP.js';

import { StatusCodes } from 'http-status-codes';

import {
  errorHandler,
  notFound,
  badRequestError,
  notFoundError,
  unauthenticationError,
  unauthorizedError,
} from '../error/index.js';
//this function will get all information about transfer
// and will send OTP email to user transfer
const transferProcess = async (req, res, next) => {
  const { money, numberPhone, message, userBearFee } = req.body;
  // get information about user login
  const user = req.user;
  const getUser = await User.findOne({ _id: user.userId });

  // get user who receive money
  const getReceiver = await User.findOne({ phone: numberPhone });
  if (getUser.money < money) {
    /* const history = await History.create({
            type: "Transfer",
            money: money,
            message: message,
            date: Date.now(),
            status: "FAIL",
            fromUser: getUser.username,
            toUser: getReceiver.username,
            feeTransfer: money * 0.05,
            userBearFee: usernameFee,
        }) */
    throw new badRequestError(
      'Transfer money fail your balance not have enough money to transfer'
    );
  }
  const randomOTP = uniqueRandom(100000, 999999);
  const otp = randomOTP();
  getUser.otpTransaction = otp.toString();
  getUser.save();
  sendOTP({
    name: getUser.name,
    email: getUser.email,
    otpTransaction: otp.toString(),
  });

  return res.status(StatusCodes.OK).json({ msg: 'Send otp success' });
};

export { transferProcess };
