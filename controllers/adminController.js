import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import Card from '../models/Card.js';
import History from '../models/History.js';
import uniqueRandom from 'unique-random';
import sendEmailBalance from '../utils/sendEmailBalance.js';

import {
    errorHandler,
    notFound,
    badRequestError,
    notFoundError,
    unauthenticationError,
    unauthorizedError,
} from '../error/index.js';


// update status for withdraw money transaction
const updateStatusWithdrawMoney = async (req, res) => {
    const idHistory = req.params.id;
    const status = req.body.status;
    const getHistory = await History.findOne({
        _id: idHistory,
        type: 'WITHDRAW',
    });
    if (!getHistory)
        throw new badRequestError(`Cannot find history ${idHistory}`);
    const preStatus = getHistory.status;
    getHistory.status = status;
    getHistory.save();

    if (preStatus === 'PROCESSING' && getHistory.status === 'SUCCESS') {
        const getUser = await User.findOne({ username: getHistory.fromUser });
        getUser.money -= getHistory.money + getHistory.feeTransfer;
        getUser.save();
        return res.status(StatusCodes.OK).json({
            msg: 'Withdraw Money success',
            user: getUser,
            history: getHistory,
        });
    }
    return res
        .status(StatusCodes.OK)
        .json({ msg: 'Update status transaction success', history: getHistory });
};

// This function for admin to allow transfer greater than 5 000 000
const updateStatus = async (req, res) => {
    const idHistory = req.params.id;
    const status = req.body.status;

    const getHistory = await History.findOne({ _id: idHistory });
    const preStatus = getHistory.status;
    if (!getHistory)
        throw new badRequestError(`Cannot find history ${idHistory}`);
    getHistory.status = status;
    getHistory.save();
    const money = getHistory.money;
    // when admin update status success to allow this transfer will complete final stage
    // history status will change to SUCCESS and execute process transfer to balance of user
    if (preStatus === 'PROCESSING' && getHistory.status === 'SUCCESS') {
        // get two user in transaction money of this history
        const getTransfer = await User.findOne({ username: getHistory.fromUser });
        const getReceiver = await User.findOne({ username: getHistory.toUser });
        getTransfer.money -= money;
        getTransfer.save();
        getReceiver.money += money;
        getReceiver.save();
        sendEmailBalance({
            name: getReceiver.name,
            email: getReceiver.email,
            balance: getReceiver.money,
            history: getHistory,
        });
    }

    res
        .status(StatusCodes.OK)
        .json({ msg: 'Update status success', history: getHistory });
};

const getAllUsersProcessing = async(req, res) => {
    const allUser = await User.find({identify: "processing"})
    if(!allUser){
        throw new badRequestError("Cannot find all user wait processing")
    }

    res.status(StatusCodes.OK).json({msg: 'Get all users wait processing success', allUser: allUser})
}

const getAllUsers = async(req, res) => {
    const allUser = await User.find({identify: "processing"})
    if(!allUser){
        throw new badRequestError("Cannot find all user processing")
    }

    res.status(StatusCodes.OK).json({msg: 'Get all processing users success', allUser: allUser})
}

export {updateStatus, updateStatusWithdrawMoney, getAllUsersProcessing}