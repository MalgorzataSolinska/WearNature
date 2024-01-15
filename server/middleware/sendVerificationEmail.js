import nodemailer from 'nodemailer';

export const sendVerificationEmail = (token, email) => {
  const html = ` 
    <html>
    <body>
    <h3> Witaj w Wear Nature! </h3>
    <p> Dziękujemy za rejestrację. </p>
    <p> Potwierdź adres email i zacznij korzystać ze swojego konta: </p>
    <a href="http://localhost:3000/email-verify/${token}">Klik!</a>
    </body>
    </html>
    `;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wearnatureclothing@gmail.com',
      pass: 'kulw qrfl qdbh qfyo',
    },
  });
  const mailOptions = {
    from: 'wearnatureclothing@gmail.com',
    to: email,
    subject: 'Weryfikacja adresu email',
    html: html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email send to ${email}`);
      console.log(info.response);
    }
  });
};
