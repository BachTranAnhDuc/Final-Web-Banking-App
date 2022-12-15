import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import Card from '../models/Card.js';
import History from '../models/History.js'

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


// Function: recharge money input numberCard, date expire, cvv
// 3 type of card(numberCard length 6, date expire, CVV length 3)
// if input number card length === 6 && not in 3 card support => through message: "This card not support"
// if input number card valid && (date expire wrong || cvv wrong) => through error in each case
// save information in transaction history
const rechargeMoney = async (req, res) => {
  const { numberCard, dateExpire, cvvNumber, money } = req.body
  // const isCardNumberExist = await Card.findOne({numberCard: numberCard})
  // const isDateExist = await Card.findOne({numberCard: numberCard,dateExpire: dateExpire})
  // const isCVVExist = await Card.findOne({numberCard: numberCard, dateExpire: dateExpire, cvvNumber: cvvNumber})
  const user = req.user
  const getUser = await User.findOne({ _id: user.userId })
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
  if (!getUser) {
    throw new badRequestError("Cannot find this user")
  }

  getUser.money += money
  getUser.save() // update the user balance


  //-------------------------------------------------------
  // save action recharge money to history

  const history = await History.create({
    type: "Recharge",
    money: money,
    message: "",
    date: Date.now(),
    status: "SUCCESS",
    fromUser: getUser.username,
    toUser: getUser.username,
    feeTransfer: 0,
    userBearFee: "",
  })
  res.status(StatusCodes.OK).json({ msg: 'Recharge success', user: getUser, history: history });
}

// transfer money from user to another user and save to history
// have fee transfer 5% money transfer
// OTP 1 minute transfer
// have email report transfer
const transferMoney = async (req, res) => {
  // input: amount money transfer
  //        number phone of user receive money
  //        message of user transfer money
  //        user bear fee transfer 5% money transfer
  const { money, numberPhone, message, userBearFee } = req.body;
  // get information about user login 
  const user = req.user
  const getUser = await User.findOne({ _id: user.userId })

  // get user who receive money
  const getReceiver = await User.findOne({ phone: numberPhone })

  let usernameFee = ""
  if (userBearFee === "Me") {
    getUser.money = getUser.money - (money * 0.05)
    usernameFee = getUser.username
  }
  else {
    money = money - (money * 0.05)
    usernameFee = getReceiver.username
  }
  // check user balance transfer money 
  if (getUser.money < money) {
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
  }


  // else execute process transfer money
  // check user bear to fee transfer
  // - money of user transfer and + money to balance of user receive
  // must check money > 5 000 000 admin must allow
  if (money >= 5000000) {
    const history = await History.create({
      type: "Transfer",
      money: money,
      message: message,
      date: Date.now(),
      status: "PROCESSING",
      fromUser: getUser.username,
      toUser: getReceiver.username,
      feeTransfer: money * 0.05,
      userBearFee: usernameFee,
    })
    return res.status(StatusCodes.OK).json({ msg: 'Transfer money more than 5 000 000 please wait admin allow', user: getUser, receiver: getReceiver, history: history });
  }


  getUser.money -= money
  getUser.save()
  getReceiver.money += money
  getReceiver.save()

  //-------------------------------------------------------
  // save action recharge money to history

  const history = await History.create({
    type: "Transfer",
    money: money,
    message: message,
    date: Date.now(),
    status: "SUCCESS",
    fromUser: getUser.username,
    toUser: getReceiver.username,
    feeTransfer: money * 0.05,
    userBearFee: usernameFee,
  })

  res.status(StatusCodes.OK).json({ msg: 'Transfer money success', user: getUser, receiver: getReceiver, history: history });

}

// This function for admin to allow transfer greater than 5 000 000
const updateStatus = async (req, res) => {
  const idHistory = req.params.id
  const status = req.body.status

  const getHistory = await History.findOne({ _id: idHistory })
  const preStatus = getHistory.status
  if (!getHistory)
    throw new badRequestError(`Cannot find history ${idHistory}`)
  getHistory.status = status
  getHistory.save()

  // when admin update status success to allow this transfer will complete final stage
  // history status will change to SUCCESS and execute process transfer to balance of user
  if (preStatus === 'PROCESSING' && getHistory.status === "SUCCESS") {
    // get two user in transaction money of this history
    const getTransfer = await User.findOne({ username: getHistory.fromUser })
    const getReceiver = await User.findOne({ username: getHistory.toUser })
    getUser.money -= money
    getUser.save()
    getReceiver.money += money
    getReceiver.save()
  }
  res.status(StatusCodes.OK).json({ msg: "Update status success", history: getHistory })
}
export { getAllUsers, getUser, identifyUser, rechargeMoney, transferMoney, updateStatus };
