const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  secure: true,
  auth: {
    /* type: 'OAuth2', */
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
    /* clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN */
  }
});

const sendResetPasssword = async (email, resetLink) => {
  try {
    const templatePath = process.env.RESET_PASSWORD;
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const emailContent = templateContent.replace(/{{resetLink}}/g, resetLink);

    await transporter.sendMail({
          from:  process.env.NODEMAILER_EMAIL,
          to: email,
          subject: 'Reinicio de contraseña',
          html: emailContent,
      }, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });

      return `Correo de confirmación enviado a ${email}`;
  } catch (error) {
    throw new Error('Error al enviar el correo de confirmación:');
  }
}


const generateResetToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { algorithm: "HS256", expiresIn: 1200, })
}

const verifyResetToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
}

module.exports = { sendResetPasssword, generateResetToken, verifyResetToken, transporter }
