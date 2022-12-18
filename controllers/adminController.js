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
        const updateMoney = Number(getUser.money) - Number(getHistory.money) + Number(getHistory.feeTransfer)
        getUser.money = updateMoney;
        getUser.save();
        return res.status(StatusCodes.OK).json({
            msg: 'Withdraw Money success',
            user: getUser,
            history: getHistory,
        });
    }
    return res
        .status(StatusCodes.OK)
        .json({ msg: 'Update status withdraw success', history: getHistory });
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
        const updateMoneyTransfer = Number(getTransfer.money) - Number(money)
        getTransfer.money = updateMoneyTransfer;
        getTransfer.save();
        const updateMoneyReceiver = Number(getReceiver.money) + Number(money)
        getReceiver.money = updateMoneyReceiver;
        getReceiver.save();
        sendEmailBalance({
            name: getReceiver.name,
            email: getReceiver.email,
            balance: getReceiver.money,
            history: getHistory,
        });
    }

    return res
        .status(StatusCodes.OK)
        .json({ msg: 'Update transfer money status success', history: getHistory });
};

const getAllUsersProcessing = async(req, res) => {
    const allUser = await User.find({$or:[{"identify": "processing"},{"isVerified": false}]}).sort({"verifiedDate":1})
    if(!allUser){
        throw new badRequestError("Cannot find all user wait processing")
    }

    return res.status(StatusCodes.OK).json({msg: 'Get all users wait processing success', allUser: allUser})
}

const getAllUsersActive = async(req, res) => {
    const allUser = await User.find({$and:[{"identify": "success"},{"isVerified": true}]}).sort({"verifiedDate":1})
    if(!allUser){
        throw new badRequestError("Cannot find all user active")
    }

    return res.status(StatusCodes.OK).json({msg: 'Get all active users success', allUser: allUser})
}

const getAllUsersBlock = async(req, res) => {
    const allUser = await User.find({identify:"fail"}).sort({"verifiedDate":1})
    if(!allUser){
        throw new badRequestError("Cannot find all user block")
    }

    return res.status(StatusCodes.OK).json({msg: 'Get all block users success', allUser: allUser})
}

const getAllUsersBlockPassword = async(req, res) => {
    const allUser = await User.find({loginFail: 6}).sort({"verifiedDate":1})
    if(!allUser){
        throw new badRequestError("Cannot find all user block")
    }

    return res.status(StatusCodes.OK).json({msg: 'Get all block users success', allUser: allUser})
}


// update identify for user processing "processing" to "success", "fail", "waiting"
const updateIdentifyUser = async(req, res) => {
    const idUser = req.params.id
    const identify = req.body.identify
    const getUser = await User.findOne({_id: idUser})
    if(!getUser)
        throw new NotFoundError(`Can not found this user ${idUser}`)
    getUser.identify = identify
    getUser.save()
    return res.status(StatusCodes.OK).json({ msg:"Update identify for user success", user: getUser })
}

// unlock account for user block by enter wrong password 6 times

const unlockUserWrongPassword = async (req,res)=> {
    const idUser = req.params.id
    const isUnlock = req.body
    const getUser = await User.findOne({_id: idUser})
    if(!getUser)
        throw new NotFoundError(`Can not found this user ${idUser}`)
    getUser.loginFail = 0
    getUser.save()
    return res.status(StatusCodes.OK).json({ msg:"Unlock user success", user: getUser })
}

export {updateStatus, updateStatusWithdrawMoney, getAllUsersProcessing, getAllUsersActive, getAllUsersBlock, getAllUsersBlockPassword,updateIdentifyUser, unlockUserWrongPassword}