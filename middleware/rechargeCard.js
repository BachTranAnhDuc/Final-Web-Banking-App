import {
    errorHandler,
    notFound,
    badRequestError,
    notFoundError,
    unauthenticationError,
    unauthorizedError,
} from '../error/index.js';

import Card from '../models/Card.js'
import dateFormat from 'dateformat'

// validate card if card is valid next()
const validateCard = async function (req, res, next) {
    const {numberCard, dateExpire, cvvNumber} = req.body
    const getCard = await Card.findOne({ numberCard: numberCard })
    if (!getCard)
        throw new badRequestError("Number card is not valid")
    
    const date = getCard.dateExpire.toLocaleDateString("en-US")
    const newDate = dateFormat(date, "yyyy-mm-dd")
    
    if (dateExpire !== newDate) {
        throw new badRequestError("Date Expire is not valid")
    }
    if (cvvNumber !== getCard.cvvNumber) {
        throw new badRequestError("Cvv number is not valid")
    }
    next()
}


// validate amount money recharge next() if amount money is valid
const validateMoneyRecharge = async function (req, res, next) {
    const {numberCard, dateExpire, cvvNumber, money} = req.body
    // convert string to date
    let date = new Date(dateExpire)
    date.toLocaleDateString("en-US")
    const newDate = dateFormat(date, "yyyy-mm-dd")
    // find card in database
    const getCard = await Card.findOne({ numberCard: numberCard, dateExpire: newDate, cvvNumber: cvvNumber })
    console.log(getCard)
    // With number Card 2222222 and 3333333 through msg err if amount money have > max Recharge
    if (getCard.limitMoney === true) {
        // with number card 333333
        if (getCard.maxRecharge === 0) {
            throw new badRequestError(`This number card ${numberCard}  is card out of money`)
        }
        // with number card 222222
        if (money > getCard.maxRecharge) {
            throw new badRequestError(`The amount money recharge is limit below + ${getCard.maxRecharge} in 1 time recharge`)
        }
    }
    next()
}

export {validateCard, validateMoneyRecharge}