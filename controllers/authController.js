import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import uniqueRandom from 'unique-random';

const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Login success' });
};

const register = async (req, res) => {
  const { phone, email, name, address, birth } = req.body;

  const randomUsername = uniqueRandom(100000000, 999999999);
  const randomPassword = uniqueRandom(100000, 999999);

  const isExistUsername = User.findOne({ username: randomUsername });

  const user = await User.create({
    name,
    phone,
    email,
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
