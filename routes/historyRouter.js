import express from 'express';

const router = express.Router();

import { authenticateUser, authorizePermissions } from '../middleware/index.js';

import {getAllHistory,
    getHistory,
    getHistoryByType,
    getHistoryByStatus,
    getHistoryByFromUser,
    getHistoryByToUser} from '../controllers/historyController.js'

router.route("/getAllHistory").get(authenticateUser, authorizePermissions(['admin']),getAllHistory)

router.route("/getHistory/:id").get(authenticateUser,getHistory)

router.route("/getHistoryByType/:type").get(authenticateUser,getHistoryByType)

router.route("/getHistoryByStatus/:status").get(authenticateUser,getHistoryByStatus)

router.route("/getHistoryByFromUser/:fromUser").get(authenticateUser,getHistoryByFromUser)

router.route("/getHistoryByToUser/:toUser").get(authenticateUser,getHistoryByToUser)


export default router;
