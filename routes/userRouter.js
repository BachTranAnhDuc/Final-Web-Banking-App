import express from 'express';

const router = express.Router();

import { getAllUsers, getUser } from '../controllers/userController.js';
import { unauthorizedError } from '../error/index.js';
import { authenticateUser, authorizePermissions } from '../middleware/index.js';

router
  .route('/')
  .get(authenticateUser, authorizePermissions(['admin']), getAllUsers);
router
  .route('/:id')
  .get(authenticateUser, authorizePermissions(['admin']), getUser);

export default router;
