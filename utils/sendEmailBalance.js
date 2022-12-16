import sendEmail from './sendEmail.js';
import dateFormat from 'dateformat'
const sendEmailBalance = async ({
    name,
    email,
    balance,
    history
}) => {
    console.log('Email balance is sent')
    const moneyFormat = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(balance);
    const moneyTransaction = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(history.money);
    const date = history.date.toLocaleDateString("en-US")
    const newDate = dateFormat(date, "yyyy-mm-dd")
    const message = `<p>Your Balance have a change is: ${moneyFormat}</p>`;
    const message2 = `<p>This is history transaction</p><br>
    <p>Type Transaction: ${history.type}</p>
    <p>From User Account: ${history.fromUser}</p>
    <p>To User Account: ${history.toUser}</p>
    <p>Status Transaction: ${history.status}</p>
    <p>Money Transaction: ${moneyTransaction}</p>
    <<p>Date Transaction: ${newDate}</p>
    <p>Fee transaction: ${history.feeTransfer}</p>
    <p>Fee payer: ${history.userBearFee}</p>
    `
    return sendEmail({
        to: email,
        subject: 'Your balance in wallet',
        html: `<h4> Hello, ${name}</h4>
    ${message}
    ${message2}
    `,
    });
};

export default sendEmailBalance;