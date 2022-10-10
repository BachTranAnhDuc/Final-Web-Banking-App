import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import uniqueRandom from 'unique-random';
import crypto from 'crypto';
import cloudinary from 'cloudinary';
import fs from 'fs';

import {
  sendVerificationEmail,
  createJWT,
  isTokenValid,
  sendOTPForgotPass,
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

  if (!username && !password) {
    throw new badRequestError('Please provide username and password');
  }

  if (!username) {
    throw new badRequestError('Please provide username');
  }

  if (!password) {
    throw new badRequestError('Please provide password');
  }

  const user = await User.findOne({ username });

  // console.log(`Is first login: ${isFirstLogin}`);

  if (!user) {
    throw new badRequestError(
      'Can not find user, please provide true username'
    );
  }

  const { isFirstLogin } = user;

  const isPassword = await user.comparePassword(password);

  if (!isPassword) {
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

const uploadUserImage = async (req, res) => {
  const { imageFront, imageBack } = req.files;
  const { tempFilePath: tempFilePathFront } = imageFront;
  const { tempFilePath: tempFilePathBack } = imageBack;
  const result = await cloudinary.v2.uploader.upload(tempFilePathBack, {
    use_filename: true,
    folder: `bankist/users/${username}`,
  });
  // fs.unlinkSync(req.files.image.tempFilePathBack);
  console.log(result.secure_url);
  res
    .status(StatusCodes.OK)
    .json({ msg: 'upload success', data: result.secure_url });

  // const result = await cloudinary.uploader.upload(
  //   req.files.image.tempFilePath,
  //   {
  //     use_filename: true,
  //     folder: 'file-upload',
  //   }
  // );
  // fs.unlinkSync(req.files.image.tempFilePath);
  // return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

// const uploadUserImage1 = async (req, res) => {
//   const result = await cloudinary.v2.uploader.upload(
//     req.files.image.tempFilePath,
//     {
//       use_filename: true,
//       folder: `bankist`,
//     }
//   );

//   fs.unlinkSync(req.files.image.tempFilePath);

//   console.log(req.files.image);

//   res
//     .status(StatusCodes.OK)
//     .json({ msg: 'upload success', data: result.secure_url });
// };

const uploadUserImage1 = async (req, res) => {
  console.log(req.files);
  console.log(typeof req.files);

  if (req.files.imageFront) {
    const result = await cloudinary.v2.uploader.upload(
      req.files.imageFront.tempFilePath,
      {
        use_filename: true,
        folder: `bankist`,
      }
    );
    fs.unlinkSync(req.files.imageFront.tempFilePath);

    res
      .status(StatusCodes.OK)
      .json({ msg: 'upload success', data: result.secure_url });
  } else {
    const result = await cloudinary.v2.uploader.upload(
      req.files.imageBack.tempFilePath,
      {
        use_filename: true,
        folder: `bankist`,
      }
    );

    fs.unlinkSync(req.files.imageBack.tempFilePath);

    res
      .status(StatusCodes.OK)
      .json({ msg: 'upload success', data: result.secure_url });
  }
};

const uploadImage = async (tempPath, username) => {
  const up = await cloudinary.v2.uploader.upload(
    tempPath,
    {
      use_filename: true,
      folder: `/bankist/users/${username}`,
    },
    (error, result) => {
      console.log(result, error);
    }
  );

  fs.unlinkSync(tempPath);

  return up.secure_url;
};

const register = async (req, res) => {
  const {
    phone: phoneReq,
    email: emailReq,
    name,
    address,
    birth,
    // imageFront,
    // imageBack,
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

  const rdUsername = randomUsername();
  const rdPwd = randomPassword();

  console.log('image here');
  /* console.log(req.body); */

  // const { imageFront, imageBack } = req.files;
  // const { tempFilePath: tempFilePathFront } = imageFront;
  // const { tempFilePath: tempFilePathBack } = imageBack;

  // console.log(imageFront);

  let imgF = '';
  let imgB = '';

  try {
    // const up1 = await uploadImage(tempFilePathBack, rdUsername);
    // const up2 = await uploadImage(tempFilePathFront, rdUsername);

    console.log(req.files);

    const result1 = await cloudinary.v2.uploader.upload(
      req.files.imageFront.tempFilePath,
      {
        use_filename: true,
        folder: `bankist`,
      }
    );
    const result2 = await cloudinary.v2.uploader.upload(
      req.files.imageBack.tempFilePath,
      {
        use_filename: true,
        folder: `bankist`,
      }
    );
    fs.unlinkSync(req.files.imageFront.tempFilePath);
    fs.unlinkSync(req.files.imageBack.tempFilePath);

    imgB = result2.secure_url;
    imgF = result1.secure_url;
  } catch (error) {
    console.log('Cannot upload image');
    console.log(error);
  }

  // console.log('link url image here');
  // console.log(up1);
  // console.log(up2);

  const user = await User.create({
    name,
    phone: phoneReq,
    email: emailReq,
    address,
    birth,
    verificationToken,
    username: rdUsername,
    password: rdPwd,
    imageFront: imgF,
    imageBack: imgB,
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

// function: forget password
// scenario: user click forgot pass and enter email and phone
// server random otp and send otp to email user
const forgotPassword = async (req, res) => {
  //get email and phone
  const { email, phone } = req.body;
  // find user in database
  const findUser = await User.findOne({ email: email, phone: phone });
  console.log(findUser);
  // if user with email not exist in database
  if (!findUser) {
    throw new badRequestError('Cannot find user');
  }
  // then check phone user in database with phone input forgotPass
  // random OTP to send email user
  const randomOTP = uniqueRandom(100000, 999999);
  const otp = randomOTP();
  findUser.otpForgotPass = otp.toString();
  // send otp to email user
  sendOTPForgotPass({
    name: findUser.name,
    email: findUser.email,
    otpForgotPass: findUser.otpForgotPass,
  });
  // save otp to database
  findUser.save();

  res.status(StatusCodes.OK).json({ msg: 'Forgot password success' });
};

// (Function) Enter OTP forgot password
// Validate: check length input is equal 6, OTP input is equal OTP send to email from server
// True: set OTP field in database "" and redirect change password page
// False: Show warning message and display button for user can get new OTP => send otp email again
// False(validation): Check OTP is not duplicate Old OTP save in database
const enterOTPForgotPass = async (req, res) => {
  //get OTP from input
  const { email, phone, otpForgotPass } = req.body;
  // check length otp input
  const user = await User.findOne({ email: email, phone: phone });

  const { otpForgotPass: otpDb } = user;

  if (otpForgotPass.length !== 6) {
    throw new badRequestError('OTP must be 6 character');
  }
  // false user enter wrong otp show message and button for user to request otp again
  if (otpForgotPass !== user.otpForgotPass) {
    throw new badRequestError('OTP is not valid please enter otp again');
  }
  // true
  user.otpForgotPass = '';
  user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: 'OTP Forgot password is true, redirect to change password' });
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

  if (!pwd) {
    console.log('password is empty here');
    throw new badRequestError('Password must not empty');
  }
  if (pwd.length < 6) {
    throw new badRequestError('Password must at least 6 characters');
  }
  if (!pwdConfirm) {
    console.log('password is empty here');
    throw new badRequestError('Password confirm must not empty');
  }

  if (pwd !== pwdConfirm) {
    throw new badRequestError('Confirm password is not correct!');
  }

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
  enterOTPForgotPass,
  uploadUserImage1,
};

// admin: 620277
// anna: 778364
