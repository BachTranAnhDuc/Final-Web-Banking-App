import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'kaylah.conroy59@ethereal.email',
      pass: '2qC6yq5rWytcEffNbH',
    },
  });

  let info = await transporter.sendMail({
    from: '"Bankist App" <kaylah.conroy59@ethereal.email>', // sender address
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
