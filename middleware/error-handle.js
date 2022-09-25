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
    // console.log(err);
    const { _id: idReq } = err.value;
    customError.msg = `No item found with id: ${idReq}`;
    customError.statusCode = 404;
  }

  // console.log(req.body);

  const { username } = req.body;

  // find user
  const inputUser = await User.findOne({ username: username });

  // check if exist user
  if (inputUser) {
    // ckech is admin
    if (inputUser.role !== 'admin') {
      const numberOfFail = inputUser.loginFail;

      if (numberOfFail < 6) {
        inputUser.loginFail = numberOfFail + 1;
      } else {
        inputUser.loginFail = 6;
      }

      inputUser.save();
    }
  }

  // console.log(username);
  // console.log(inputUser);

  // const loginFail = { inputUser };

  console.log('Catch error here');

  return res
    .status(customError.statusCode)
    .json({ msg: customError.msg, user: inputUser });
};

export default errorHandler;
