const { generateResetToken, sendResetPasssword } = require('../../utils/trnasportNodeMailer')
const { Usuario } = require('../../db')
require('dotenv').config();

const {
  HOSTCLIENT
} = process.env;

const getResetPassword = async (req, res) => {
  try {
    const { email } = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !emailRegex.test(email)){
      return res.status(401).json({error: 'Debe enviar un correo electronico correcto'})
    }

    const user = await Usuario.findOne({ where: { correo: email } });    
    if(!user){
      return res.status(401).json({error: 'Usuario o correo electronico no existe'})
    }
    
    const idUser = user.dataValues.id
    const tkn = generateResetToken({idUser})
    const link = `${HOSTCLIENT}?token=${tkn}`
    
    await sendResetPasssword(email, link);

    return res.status(200).json({ message: `Correo de restablecimiento de contraseña enviado a '${email}'` });

  } catch (error) {
    return res.status(404).json({error: error})
  }
}

module.exports = { getResetPassword }