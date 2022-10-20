import sendEmail from './sendEmail.js';

const sendOTP = async ({
    name,
    email,
    otpTransaction,
}) => {
    console.log('OTP is sent')
    const message = `<p>Your OTP to transaction: ${otpTransaction} </p>`;
    const message2 = "Please enter this OTP in form to confirm your transaction"
    return sendEmail({
        to: email,
        subject: 'OTP Confirm transaction',
        html: `<h4> Hello, ${name}</h4>
    ${message}
    ${message2}
    `,
    });
};

export default sendOTP;

