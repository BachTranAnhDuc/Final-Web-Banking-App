import { StatusCodes } from 'http-status-codes';

const getAllUsers = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Get all users success' });
};

const getUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Get user success' });
};

export { getAllUsers, getUser };
