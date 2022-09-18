import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import uniqueRandom from 'unique-random';

import {
  errorHandler,
  notFound,
  badRequestError,
  notFoundError,
  unauthenticationError,
  unauthorizedError,
} from '../error/index.js';

const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Login success' });
};

const register = async (req, res) => {
  const { phone: phoneReq, email: emailReq, name, address, birth } = req.body;

  const randomUsername = uniqueRandom(100000000, 999999999);
  const randomPassword = uniqueRandom(100000, 999999);

  if (!phoneReq || !emailReq || !name || !address || !birth) {
    throw new badRequestError('Please provide all values!');
  }

  const isEmailExist = await User.findOne({ email: emailReq });
  const isPhoneExist = await User.findOne({ phone: phoneReq });

  console.log(isPhoneExist, phoneReq);

  if (isPhoneExist) {
    throw new badRequestError(
      `Already exist phone: ${phoneReq} please choose another phone!`
    );
  }
  if (isEmailExist) {
    throw new badRequestError(
      `Already exist email: ${emailReq} please choose another email!`
    );
  }

  const user = await User.create({
    name,
    phoneReq,
    emailReq,
    address,
    birth,
    verificationToken: 'verification token',
    username: randomUsername(),
    password: randomPassword(),
  });

  res.status(StatusCodes.OK).json({ msg: 'Register success', user: user });
};

const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Update user success' });
};

const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Logout success' });
};

const forgotPassword = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Forgot password success' });
};

export { login, register, updateUser, logout, forgotPassword };
