import express from 'express';

const router = express.Router();

import { getAllUsers, getUser } from '../controllers/userController.js';

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser);

export default router;
