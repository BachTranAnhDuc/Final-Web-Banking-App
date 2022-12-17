import express from 'express';

const router = express.Router();

import {
    updateStatus,
    updateStatusWithdrawMoney,
    getAllUsersProcessing,
} from '../controllers/adminController.js';
import { unauthorizedError } from '../error/index.js';
import { authenticateUser, authorizePermissions } from '../middleware/index.js';

router
    .route('/updateStatusWithdrawMoney/:id')
    .post(
        authenticateUser,
        authorizePermissions(['admin']),
        updateStatusWithdrawMoney
    );

// update status history for transfer
router
    .route('/updateStatus/:id')
    .post(authenticateUser, authorizePermissions(['admin']), updateStatus);    


router.route("/getAllUserProcessing").get(authenticateUser, authorizePermissions(['admin']),getAllUsersProcessing)

export default router;