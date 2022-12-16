import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    numberCard: {
        type: String,
        required: [true, "Please provide your number card"],
        unique: true,
        minLength: [6, "Number Card must be 6 characters"]
    },
    dateExpire:{
        type: Date,
        required: [true, "Please provide date expire"]
    },
    cvvNumber: {
        type: String,
        required: [true, "Please provide cvv number"],
        minlength: [3, "CVV number must be 3 characters"]
    },
    limitMoney:{
        type: Boolean,
    },
    maxRecharge: {
        type: Number,
    },
    canWithdraw:{
        type:Boolean,
    }
})


export default mongoose.model('Card', CardSchema);
