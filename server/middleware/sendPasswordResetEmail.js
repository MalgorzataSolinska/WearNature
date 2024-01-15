import nodemailer from 'nodemailer';
export const sendPasswordResetEmail = (token, email, firstName) => {
  const html = `
    <html> 
        <body>
            <h3>
            Dzień dobry ${firstName}!
            </h3>
            <p>Poniższy link przekieruje Cię na stronę, gdzie będzie można zmienić hasło.</p> 
            <a href="http://localhost:3000/password-reset/${token}"> Klik!</a>
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
    subject: 'Zmiana hasła',
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
