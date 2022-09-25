import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

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

  const user = User.findById({ _id: id });

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

export { getAllUsers, getUser, identifyUser };
