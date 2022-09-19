import sendEmail from './sendEmail.js';

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
  username,
  password,
}) => {
  const verifyEmail = `${origin}/register/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>`;

  const message2 = `<p>Username: ${username}</p><p>Password: ${password}</p>`;

  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: `<h4> Hello, ${name}</h4>
    ${message}
    ${message2}
    `,
  });
};

export default sendVerificationEmail;
