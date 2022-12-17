import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import History from '../models/History.js';

import {
  errorHandler,
  notFound,
  badRequestError,
  notFoundError,
  unauthenticationError,
  unauthorizedError,
} from '../error/index.js';

const getAllHistory = async (req, res) => {
  const histories = await History.find({});

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Get all histories success', histories: histories });
};

// get History by history object id: _id
const getHistory = async (req, res) => {
  const { id } = req.params;

  const history = await History.findById({ _id: id });

  if (!history) {
    throw new badRequestError(`Can not find any history with id: ${id}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Get history success', history: history });
};

//get history by type transaction: recharge, transfer, withdraw, buy mobile card
const getHistoryByType = async (req, res) => {
  const { type } = req.params;

  const history = await History.find({ type: type });

  if (!history) {
    throw new badRequestError(`Can not find any history with type: ${type}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: `Get history with type: ${type} success`, history: history });
};

//get history by status 'PROCESSING', 'FAIL', 'SUCCESS', 'CANCEL'
const getHistoryByStatus = async (req, res) => {
  const { status } = req.params;

  const history = await History.find({ status: status });

  if (!history) {
    throw new badRequestError(
      `Can not find any history with status: ${status}`
    );
  }

  res.status(StatusCodes.OK).json({
    msg: `Get history with status: ${status} success`,
    history: history,
  });
};

// get all history have username of fromUser
const getHistoryByFromUser = async (req, res) => {
  const { fromUser } = req.params;
  const history = await History.find({ fromUser: fromUser });

  if (!history) {
    throw new badRequestError(
      `Can not find any history have transaction from User: ${fromUser}`
    );
  }

  res.status(StatusCodes.OK).json({
    msg: `Get history have transaction from User: ${fromUser} success`,
    history: history,
  });
};

// get all history have username of toUser
const getHistoryByToUser = async (req, res) => {
  const { toUser } = req.params;
  const history = await History.find({ toUser: toUser });

  if (!history) {
    throw new badRequestError(
      `Can not find any history have transaction to User: ${toUser}`
    );
  }

  res.status(StatusCodes.OK).json({
    msg: `Get history have transaction to User: ${toUser} success`,
    history: history,
  });
};

const getHistoryByUserLogin = async (req, res) => {
  // const user = req.user;
  // const getUser = await User.findOne({ _id: user.userId });
  // if (!getUser) {
  //   throw new badRequestError(`Can not find user: ${getUser}`);
  // }
  // const history = await History.find({
  //   $or: [{ fromUser: getUser.username }, { toUser: getUser.username }],
  // });

  const user = req.user;
  const getUser = await User.findOne({ _id: user.userId });
  if (!getUser) {
    throw new badRequestError(`Can not find user: ${getUser}`);
  }
  const history = await History.find({
    $or: [{ fromUser: getUser.username }, { toUser: getUser.username }],
  });

  if (!history) {
    throw new badRequestError(
      `Can not find any history have transaction user: ${getUser.username}`
    );
  }

  return res.status(StatusCodes.OK).json({
    msg: `Get history have transaction user: ${getUser.username} success`,
    history: history,
  });
};

export {
  getAllHistory,
  getHistory,
  getHistoryByType,
  getHistoryByStatus,
  getHistoryByFromUser,
  getHistoryByToUser,
  getHistoryByUserLogin,
};
