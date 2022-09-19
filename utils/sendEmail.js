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

  return transporter.sendMail({
    from: '"Bankist App" <btanhducspm@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};

export default sendEmail;
