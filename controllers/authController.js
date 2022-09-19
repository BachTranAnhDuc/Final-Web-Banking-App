import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import uniqueRandom from 'unique-random';
import crypto from 'crypto';

import { sendVerificationEmail } from '../utils/index.js';

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
  const {
    phone: phoneReq,
    email: emailReq,
    name,
    address,
    birth,
    imageFront,
    imageBack,
  } = req.body;

  const randomUsername = uniqueRandom(100000000, 999999999);
  const randomPassword = uniqueRandom(100000, 999999);

  if (!phoneReq || !emailReq || !name || !address || !birth) {
    throw new badRequestError('Please provide all values!');
  }

  const isEmailExist = await User.findOne({ email: emailReq });
  const isPhoneExist = await User.findOne({ phone: phoneReq });

  console.log(
    isPhoneExist,
    phoneReq,
    emailReq,
    name,
    address,
    birth,
    imageFront,
    imageBack
  );

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

  const verificationToken = crypto.randomBytes(40).toString('hex');

  console.log(
    isPhoneExist,
    phoneReq,
    emailReq,
    name,
    address,
    birth,
    imageFront,
    imageBack,
    verificationToken
  );

  const user = await User.create({
    name,
    phone: phoneReq,
    email: emailReq,
    address,
    birth,
    verificationToken,
    username: randomUsername(),
    password: randomPassword(),
    imageFront,
    imageBack,
  });

  const origin = 'http://localhost:3000';

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  const test = {
    name: user.name,
    email: user.email,
    username: user.username,
    password: user.password,
    verificationToken: user.verificationToken,
    origin,
  };

  console.log(test);

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

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new unauthenticationError('Verification Failed');
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomError.unauthenticationError('Verification Failed');
  }

  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = '';

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
};

export { login, register, updateUser, logout, forgotPassword, verifyEmail };
