import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: 'rubikme.company@gmail.com',
      pass: 'viaiakjerrkqhxje',
    },
  });

  let info = await transporter.sendMail({
    from: '"Bankist App" <rubikme.company@gmail.com>', // sender address
    to,
    subject,
    html,
  });

  return info;

  // return transporter.sendMail({
  //   from: '"Bankist App" <btanhducspm@gmail.com>', // sender address
  //   to,
  //   subject,
  //   html,
  // });
};

export default sendEmail;
