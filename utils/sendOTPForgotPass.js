import sendEmail from './sendEmail.js';

const sendOTPForgotPass = async ({
    name,
    email,
    otpForgotPass,
}) => {
    console.log('OTP is sent')
    const message = `<p>Your OTP to reset password: ${otpForgotPass} </p>`;
    const message2 = "Please enter this OTP in form to reset your password"
    return sendEmail({
        to: email,
        subject: 'OTP Forgot password',
        html: `<h4> Hello, ${name}</h4>
    ${message}
    ${message2}
    `,
    });
};

export default sendOTPForgotPass;

