import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

const errorHandler = async (err, req, res, next) => {
  // console.log(err);
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value  ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  // console.log(req.body);

  const { username } = req.body;

  const inputUser = await User.findOne({ username: username });

  if (inputUser.role !== 'admin') {
    const numberOfFail = inputUser.loginFail;

    inputUser.loginFail = numberOfFail + 1;

    inputUser.save();
  }

  // console.log(username);
  // console.log(inputUser);

  // const loginFail = { inputUser };

  return res
    .status(customError.statusCode)
    .json({ msg: customError.msg, user: inputUser });
};

export default errorHandler;
