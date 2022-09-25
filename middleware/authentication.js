import {
  errorHandler,
  notFound,
  badRequestError,
  notFoundError,
  unauthenticationError,
  unauthorizedError,
} from '../error/index.js';

import { isTokenValid, attachCookiesToResponse } from '../utils/index.js';

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.accessToken;

  if (!token) {
    throw new unauthenticationError('Authentication Invalid');
  }

  try {
    const { userId, phone, email, role } = isTokenValid(token);

    const user = { userId, phone, email, role };

    console.log('Authen user here');
    console.log(user);

    req.user = user;

    console.log(`Token is present: ${token}`);
    next();
  } catch (error) {
    throw new unauthenticationError('Authentication payload Invalid');
  }
};

const authorizePermissions = (roles) => {
  return (req, res, next) => {
    console.log('Check permission here');
    const roleUser = req.user.role;

    console.log(req.user);

    if (!roles.includes(roleUser)) {
      console.log('Check permission error here');
      throw new unauthorizedError(`${roleUser} cannot access this router`);
    }

    next();
  };
};

export { authenticateUser, authorizePermissions };
