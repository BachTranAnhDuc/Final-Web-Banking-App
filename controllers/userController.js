import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import Card from '../models/Card.js';
import History from '../models/History.js';
import uniqueRandom from 'unique-random';
import sendEmailBalance from '../utils/sendEmailBalance.js';
import {
  errorHandler,
  notFound,
  badRequestError,
  notFoundError,
  unauthenticationError,
  unauthorizedError,
} from '../error/index.js';

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Get all users success', users: users });
};

const getUser = async (req, res) => {
  const { id } = req.params;

  // console.log('Find user here');
  // console.log(id);

  const user = await User.findById({ _id: id });

  if (!user) {
    throw new badRequestError(`Can not find any user with id: ${id}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Get user success', user: user });
};

const identifyUser = async (req, res) => {
  const { valueIdentify } = req.body;
  const { id: idReq } = req.params;

  // console.log(id);

  const user = await User.findById({ _id: idReq });

  user.identify = valueIdentify;

  user.save();

  res.status(StatusCodes.OK).json({ msg: 'Identify user success', user: user });
};

// ----------------------------------------------------------------------------------------------
// Function: recharge money input numberCard, date expire, cvv
// 3 type of card(numberCard length 6, date expire, CVV length 3)
// if input number card length === 6 && not in 3 card support => through message: "This card not support"
// if input number card valid && (date expire wrong || cvv wrong) => through error in each case
// save information in transaction history
const rechargeMoney = async (req, res) => {
  const { numberCard, dateExpire, cvvNumber, money } = req.body;
  // const isCardNumberExist = await Card.findOne({numberCard: numberCard})
  // const isDateExist = await Card.findOne({numberCard: numberCard,dateExpire: dateExpire})
  // const isCVVExist = await Card.findOne({numberCard: numberCard, dateExpire: dateExpire, cvvNumber: cvvNumber})
  const user = req.user;
  const getUser = await User.findOne({ _id: user.userId });

  if (!getUser) {
    throw new badRequestError('Cannot find this user');
  }

  // const isMatch = await getUser.comparePassword(password);
  // if (isMatch !== true) {
  //   throw new badRequestError('Your password is incorrect!');
  // }
  // VALIDATION INPUT
  // if(numberCard.length !== 6){
  //   throw new badRequestError("Number Card must be 6 characters")
  // }

  // if(cvvNumber.length !== 3){
  //   throw new badRequestError("CVV number must be 3 characters")
  // }

  // if(numberCard.length === 6 && (isCardNumberExist === undefined || isCardNumberExist === null)) {
  //   throw new badRequestError("This card is not support")
  // }

  // if(numberCard.length === 6 && (isDateExist === undefined || isDateExist === null)) {
  //   throw new badRequestError("Date Expire is wrong")
  // }

  // if(numberCard.length === 6 && (isCVVExist === undefined || isCVVExist === null)) {
  //   throw new badRequestError("CVV is wrong")
  // }

  // PROCESSING EACH TYPE OF CARD NUMBER
  // 111111 NOT LIMIT MONEY RECHARGE AND TIMES RECHARGE
  // 222222 NOT LIMIT TIMES RECHARGE BUT LIMIT MONEY 1 000 000 IN EACH TIMES RECHARGE
  // 333333 WITH THIS CARD WILL RETURN MESSENGER "THIS CARD OUT OF MONEY"

  /* if(numberCard === "111111"){

    res.status(StatusCodes.OK).json({msg: "111111 Recharge success"})
  } */
  // if(numberCard === "222222"){
  //   if(Number(money) > 1000000){
  //     throw new badRequestError("this number card limit 1 000 000/time recharge")
  //   }
  //   //res.status(StatusCodes.OK).json({ msg: '222222 Recharge success' });
  // }
  // if(numberCard === "333333"){
  //   throw new badRequestError("this number card is card out of money")
  // }

  getUser.money += money;
  getUser.save(); // update the user balance

  //-------------------------------------------------------
  // save action recharge money to history

  const history = await History.create({
    type: 'RECHARGE',
    money: money,
    message: '',
    date: Date.now(),
    status: 'SUCCESS',
    fromUser: getUser.username,
    toUser: getUser.username,
    feeTransfer: 0,
    userBearFee: '',
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Recharge success', user: getUser, history: history });
};
//---------------------------------------------------------------------
// transfer money from user to another user and save to history
// have fee transfer 5% money transfer
// OTP 1 minute transfer
// have email report transfer
const transferMoney = async (req, res) => {
  // input: amount money transfer
  //        number phone of user receive money
  //        message of user transfer money
  //        user bear fee transfer 5% money transfer
  const { money, numberPhone, message, userBearFee, otpTransaction } = req.body;
  // get information about user login
  // money = Number(money)
  const user = req.user;
  const getUser = await User.findOne({ _id: user.userId });
  // get user who receive money
  const getReceiver = await User.findOne({ phone: numberPhone });
  if (otpTransaction !== getUser.otpTransaction) {
    throw new badRequestError(
      'Your otp enter is not valid. Please check otp again'
    );
  }
  // getUser.otpTransaction = ""
  let usernameFee = '';
  const transactionFee = money * 0.05;
  const minusBalance = getUser.money - (money + transactionFee);
  if (userBearFee === 'Me') {
    if (minusBalance < 0)
      throw new badRequestError(
        'Your balance is not enough for transfer money and pay fee transfer'
      );
    getUser.money = getUser.money - transactionFee;
    usernameFee = getUser.username;
  } else if (userBearFee !== 'Me') {
    getReceiver.money = money - transactionFee;
    usernameFee = getReceiver.username;
  }
  // check user balance transfer money
  /* if (getUser.money < money) {
    const history = await History.create({
      type: "Transfer",
      money: money,
      message: message,
      date: Date.now(),
      status: "FAIL",
      fromUser: getUser.username,
      toUser: getReceiver.username,
      feeTransfer: money * 0.05,
      userBearFee: usernameFee,
    })
    return res.status(StatusCodes.OK).json({ msg: 'Transfer money fail your balance not have enough money to transfer', user: getUser, receiver: getReceiver, history: history });
  } */

  // else execute process transfer money
  // check user bear to fee transfer
  // - money of user transfer and + money to balance of user receive
  // must check money > 5 000 000 admin must allow
  if (money >= 5000000) {
    const historyProcessing = await History.create({
      type: 'TRANSFER',
      money: money,
      message: message,
      date: Date.now(),
      status: 'PROCESSING',
      fromUser: getUser.username,
      toUser: getReceiver.username,
      feeTransfer: transactionFee,
      userBearFee: usernameFee,
    });
    getUser.otpTransaction = '';
    getUser.save();
    getReceiver.save();
    return res.status(StatusCodes.OK).json({
      msg: 'Transfer money more than 5 000 000 please wait admin allow',
      user: getUser,
      receiver: getReceiver,
      history: historyProcessing,
      status: 'waiting',
    });
  }

  getUser.otpTransaction = '';
  getUser.money -= money;
  getUser.save();
  getReceiver.money += money;
  getReceiver.save();

  //-------------------------------------------------------
  // save action recharge money to history

  const history = await History.create({
    type: 'TRANSFER',
    money: money,
    message: message,
    date: Date.now(),
    status: 'SUCCESS',
    fromUser: getUser.username,
    toUser: getReceiver.username,
    feeTransfer: money * 0.05,
    userBearFee: usernameFee,
  });
  sendEmailBalance({
    name: getReceiver.name,
    email: getReceiver.email,
    balance: getReceiver.money,
    history: history,
  });
  res.status(StatusCodes.OK).json({
    msg: 'Transfer money success',
    user: getUser,
    receiver: getReceiver,
    history: history,
    status: 'success',
  });
};

// This function for admin to allow transfer greater than 5 000 000
const updateStatus = async (req, res) => {
  const idHistory = req.params.id;
  const status = req.body.status;

  const getHistory = await History.findOne({ _id: idHistory });
  const preStatus = getHistory.status;
  if (!getHistory)
    throw new badRequestError(`Cannot find history ${idHistory}`);
  getHistory.status = status;
  getHistory.save();
  const money = getHistory.money;
  // when admin update status success to allow this transfer will complete final stage
  // history status will change to SUCCESS and execute process transfer to balance of user
  if (preStatus === 'PROCESSING' && getHistory.status === 'SUCCESS') {
    // get two user in transaction money of this history
    const getTransfer = await User.findOne({ username: getHistory.fromUser });
    const getReceiver = await User.findOne({ username: getHistory.toUser });
    getTransfer.money -= money;
    getTransfer.save();
    getReceiver.money += money;
    getReceiver.save();
    sendEmailBalance({
      name: getReceiver.name,
      email: getReceiver.email,
      balance: getReceiver.money,
      history: getHistory,
    });
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Update status success', history: getHistory });
};

//----------------------------------------------------------------
// withdraw money from username bank account to card
// processing function withdraw money
const withdrawMoney = async (req, res) => {
  const { money, message } = req.body;
  const user = req.user;
  const getUser = await User.findOne({ _id: user.userId });
  // const isMatch = await getUser.comparePassword(password);
  // if (isMatch !== true) {
  //   throw new badRequestError('Your password is incorrect!');
  // }
  if (getUser.money < money + money * 0.05) {
    throw new badRequestError(
      'Your money in balance is not enough to execute this transaction'
    );
  }
  if (money >= 5000000) {
    const historyProcessing = await History.create({
      type: 'WITHDRAW',
      money: money,
      message: message.toString(),
      date: Date.now(),
      status: 'PROCESSING',
      fromUser: getUser.username,
      toUser: '',
      feeTransfer: money * 0.05,
      userBearFee: getUser.username,
    });
    return res.status(StatusCodes.OK).json({
      msg: 'Withdraw money more than 5 000 000 please wait admin allow',
      user: getUser,
      history: historyProcessing,
      status: 'waiting',
    });
  }
  getUser.money -= money + money * 0.05;
  getUser.save();

  const history = await History.create({
    type: 'WITHDRAW',
    money: money,
    message: message.toString(),
    date: Date.now(),
    status: 'SUCCESS',
    fromUser: getUser.username,
    toUser: '',
    feeTransfer: money * 0.05,
    userBearFee: getUser.username,
  });

  res.status(StatusCodes.OK).json({
    msg: 'Withdraw Money success',
    user: getUser,
    history: history,
    status: 'success',
  });
};

/* // update status for withdraw money transaction
const updateStatusWithdrawMoney = async (req, res) => {
  const idHistory = req.params.id;
  const status = req.body.status;
  const getHistory = await History.findOne({
    _id: idHistory,
    type: 'WITHDRAW',
  });
  if (!getHistory)
    throw new badRequestError(`Cannot find history ${idHistory}`);
  const preStatus = getHistory.status;
  getHistory.status = status;
  getHistory.save();

  if (preStatus === 'PROCESSING' && getHistory.status === 'SUCCESS') {
    const getUser = await User.findOne({ username: getHistory.fromUser });
    getUser.money -= getHistory.money + getHistory.feeTransfer;
    getUser.save();
    return res.status(StatusCodes.OK).json({
      msg: 'Withdraw Money success',
      user: getUser,
      history: getHistory,
    });
  }
  return res
    .status(StatusCodes.OK)
    .json({ msg: 'Update status transaction success', history: getHistory });
}; */

// ---------------------------------------------------------------------
// Buy card Function card have 10 number 11111: Viettel, 22222: Mobifone, 33333: Vinaphone
const buyMobileCard = async (req, res) => {
  const { amount, nameCard, price } = req.body;
  const cardCatogries = {
    Viettel: '11111',
    Mobifone: '11111',
    Vinaphone: '33333',
  };
  if (amount > 5) throw new badRequestError('The amount of card must <= 5!');
  const user = req.user;
  const money = price * amount;
  const feeTransaction = money * 0;
  const getUser = await User.findOne({ _id: user.userId });
  // const isMatch = await getUser.comparePassword(password);
  // if (isMatch !== true) {
  //   throw new badRequestError('Your password is incorrect!');
  // }
  if (getUser.money < money + feeTransaction) {
    throw new badRequestError('Your money in balance is not enough to buy');
  }
  getUser.money -= money + feeTransaction;
  getUser.save();
  const randomNumber = uniqueRandom(100000, 999999);
  let inforCard = [];
  for (let i = 0; i < amount; i++) {
    let random = randomNumber();
    let numberCard = cardCatogries[nameCard] + random.toString();
    inforCard.push({
      nameCard: nameCard,
      price: price,
      numberCard: numberCard,
    });
  }

  let message = 'YOUR IMFORMATION CARD \n';
  for (let i = 0; i < inforCard.length; i++) {
    message +=
      'Name Card: ' +
      inforCard[i].nameCard +
      ' , Number Card: ' +
      inforCard[i].numberCard +
      '\n';
  }

  let messageWeb = [];

  for (let i = 0; i < inforCard.length; i++) {
    messageWeb = [
      ...messageWeb,
      {
        nameCard: inforCard[i].nameCard,
        numberCard: inforCard[i].numberCard,
      },
    ];
  }

  const history = await History.create({
    type: 'BUY MOBILE CARD',
    money: money,
    message: message,
    date: Date.now(),
    status: 'SUCCESS',
    fromUser: getUser.username,
    toUser: '',
    feeTransfer: feeTransaction,
    userBearFee: getUser.username,
  });
  return res.status(StatusCodes.OK).json({
    msg: 'Buy mobile Card success',
    getUser: getUser,
    history: history,
    dataCard: messageWeb,
  });
};
export {
  getAllUsers,
  getUser,
  identifyUser,
  rechargeMoney,
  transferMoney,
  withdrawMoney,
  buyMobileCard,
};
