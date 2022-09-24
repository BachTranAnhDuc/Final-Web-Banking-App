import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import uniqueRandom from 'unique-random';
import crypto from 'crypto';

import {
  sendVerificationEmail,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
} from '../utils/index.js';

import {
  errorHandler,
  notFound,
  badRequestError,
  notFoundError,
  unauthenticationError,
  unauthorizedError,
} from '../error/index.js';

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new badRequestError('Please provide email and password');
  }

  const user = await User.findOne({ username });

  // console.log(`Is first login: ${isFirstLogin}`);

  if (!user) {
    throw new badRequestError('Can not find user');
  }

  const { isFirstLogin } = user;

  const isPassword = await user.comparePassword(password);

  if (!isPassword) {
    // const numberOfFail = user.loginFail;

    // user.loginFail = numberOfFail + 1;

    // user.save();

    throw new unauthenticationError('Invalid password');
  }

  if (!user.isVerified) {
    console.log('not verify');
    throw new unauthenticationError('Please verify your email');
  }

  if (user.loginFail !== 6) {
    user.loginFail = 0;
  }

  user.save();

  const tokeUser = {
    userId: user._id,
    phone: user.phone,
    email: user.email,
    role: user.role,
  };

  const token = createJWT({ payload: tokeUser });

  attachCookiesToResponse({ res, token });

  res.status(StatusCodes.OK).json({
    msg: 'Login success',
    user: user,
    token: token,
    isFirstLogin: isFirstLogin,
  });
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

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const randomUsername = uniqueRandom(100000000, 999999999);
  const randomPassword = uniqueRandom(100000, 999999);

  if (!phoneReq || !emailReq || !name || !address || !birth) {
    throw new badRequestError('Please provide all values!');
  }

  const isEmailExist = await User.findOne({ email: emailReq });
  const isPhoneExist = await User.findOne({ phone: phoneReq });

  // console.log(
  //   isPhoneExist,
  //   phoneReq,
  //   emailReq,
  //   name,
  //   address,
  //   birth,
  //   imageFront,
  //   imageBack
  // );

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

  const rdUsername = randomUsername();
  const rdPwd = randomPassword();

  const user = await User.create({
    name,
    phone: phoneReq,
    email: emailReq,
    address,
    birth,
    verificationToken,
    username: rdUsername,
    password: rdPwd,
    imageFront,
    imageBack,
    role,
  });

  const origin = 'http://localhost:3000';

  console.log(`pwd random: ${rdPwd}`);

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
    username: rdUsername,
    password: rdPwd,
  });

  const tokeUser = {
    userId: user._id,
    phone: user.phone,
    email: user.email,
    role: user.role,
  };

  const token = createJWT({ payload: tokeUser });

  attachCookiesToResponse({ res, token });

  res.status(StatusCodes.OK).json({ msg: 'Register success', user: user });
};

const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Update user success' });
};

const logout = async (req, res) => {
  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
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

  console.log('token:');
  console.log(verificationToken);

  // (user.isVerified = true), (user.verifiedDay = Date.now());
  user.isVerified = true;
  user.verifiedDate = Date.now();
  // user.verificationToken = '';

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
};

const firstLogin = async (req, res) => {
  const { pwd, pwdConfirm } = req.body;
  const { user } = req;
  const { userId } = user;

  const getUser = await User.findById({ _id: userId });

  if (pwd !== pwdConfirm) {
    throw new badRequestError('Confirm password is not correct!');
  }

  // console.log('first login get user');
  // console.log(user);
  // const { password } = user;
  // console.log(`pwd: ${password}`);

  // user.password = pwd;

  getUser.password = pwd;
  getUser.isFirstLogin = false;
  getUser.save();

  const tokeUser = {
    userId: user._id,
    phone: user.phone,
    email: user.email,
    role: user.role,
  };

  const token = createJWT({ payload: tokeUser });

  attachCookiesToResponse({ res, token });

  res.status(StatusCodes.OK).json({
    msg: 'Update password success',
    token: token,
    user: getUser,
    isFirstLogin: getUser.isFirstLogin,
  });
};

export {
  login,
  register,
  updateUser,
  logout,
  forgotPassword,
  verifyEmail,
  firstLogin,
};

// admin: 620277
// anna: 778364
