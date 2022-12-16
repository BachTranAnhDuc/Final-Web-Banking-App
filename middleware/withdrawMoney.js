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
const validateWithdrawCard = async function (req, res, next) {
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
    if(getCard.canWithdraw === false) {
        throw new badRequestError("This card is not support for withdraw money")
    }
    next()
}


export {validateWithdrawCard}