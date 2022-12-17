import express from 'express';

const router = express.Router();

import {
    updateStatus,
    updateStatusWithdrawMoney,
    getAllUsersProcessing,
    getAllUsersActive,
    getAllUsersBlock,
    getAllUsersBlockPassword,
    updateIdentifyUser, unlockUserWrongPassword,
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

router.route("/getAllUserActive").get(authenticateUser, authorizePermissions(['admin']),getAllUsersActive)

router.route("/getAllUserBlock").get(authenticateUser, authorizePermissions(['admin']),getAllUsersBlock)

router.route("/getAllUsersBlockPassword").get(authenticateUser, authorizePermissions(['admin']),getAllUsersBlockPassword)

router.route("/updateIdentifyUser/:id").post(authenticateUser, authorizePermissions(['admin']),updateIdentifyUser)

router.route("/unlockUserWrongPassword/:id").post(authenticateUser, authorizePermissions(['admin']),unlockUserWrongPassword)



export default router;