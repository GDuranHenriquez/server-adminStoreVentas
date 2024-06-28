const { verifyResetToken } = require('../../utils/trnasportNodeMailer')
const { Usuario } = require('../../db')
const { encrypPass } = require('../../utils/crypPass');
const { getTokenFromHeader } = require('../token/getTokenFromHeader') 
require('dotenv').config();

const postResetPassword = async (req, res) => {
  try {
    const {password} = req.body
    const token = getTokenFromHeader(req.headers);
    
    if(!token || !password){
      return res.status(401).json({error: 'Faltan datos o token invalido'})
    }
    
    const decodedPayload = verifyResetToken(token)

    if (decodedPayload) {
      const userId = decodedPayload.idUser;
      const passCrypt = await encrypPass(password);

      const user = await Usuario.update({password: passCrypt}, {
        where: {
          id: userId
        }
      });  
      
      if(user[0] === 1){
        return res.status(200).json({message:'Contraseña restablecida exitosamente.'});
      }else{
        return res.status(401).json({error: 'Error interno no se actualizo la contraseña'});
      }
      
    } else {
      return res.status(401).json({error:'Token inválido o expirado.'});
    }

  } catch (error) {
    return res.status(501).json({error: error.message})
  }
}

module.exports = {postResetPassword};