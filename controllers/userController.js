import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import Card from '../models/Card.js';

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
const rechargeMoney = async(req, res) =>{
  const {numberCard, dateExpire, cvvNumber, money} = req.body
  // const isCardNumberExist = await Card.findOne({numberCard: numberCard})
  // const isDateExist = await Card.findOne({numberCard: numberCard,dateExpire: dateExpire})
  // const isCVVExist = await Card.findOne({numberCard: numberCard, dateExpire: dateExpire, cvvNumber: cvvNumber})
  const user = req.user
  const getUser = await User.findOne({_id: user.userId})
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
  if(!getUser){
    throw new badRequestError("Cannot find this user")
  }

  getUser.money += money
  getUser.save()
  res.status(StatusCodes.OK).json({ msg: 'Recharge success' , user: getUser});
}


export { getAllUsers, getUser, identifyUser, rechargeMoney };
