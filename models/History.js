import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
    type:{
        type:String,
        enum: ["RECHARGE", "WITHDRAW", "TRANSFER", "BUY MOBILE CARD"]
    },
    money:{
        type:Number,
    },
    message: {
        type:String,
    },
    date:{
        type:Date,
    },
    status:{
        type: String,
        enum: ['PROCESSING', 'SUCCESS', 'CANCEL']
    },
    fromUser:{
        type: String,
    },
    toUser:{
        type:String,
    },
    feeTransfer:{
        type:Number,
    },
    userBearFee:{
        type:String,
    }
})



export default mongoose.model('History', HistorySchema);