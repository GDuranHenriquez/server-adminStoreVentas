const {Router} = require('express');
const { postLoginUser } = require('../controllers/loginRegister/loginUser');
const { postRegisterUser } = require('../controllers/loginRegister/postRegister');
const { deleteSingOut } = require('../controllers/loginRegister/singOut');
const { postRegisterFromRoot } = require('../controllers/loginRegister/registerFromRoot')
const { getResetPassword } = require('../controllers/loginRegister/getResetPassword')
const { postResetPassword } = require('../controllers/loginRegister/postResetPassword')
const routerLoginRegister = Router();

routerLoginRegister.post('/register-user', postRegisterUser);
routerLoginRegister.post('/register-user-root', postRegisterFromRoot);
routerLoginRegister.post('/login', postLoginUser);
routerLoginRegister.post('/consult-reset-password', getResetPassword)
routerLoginRegister.post('/confirm-reset-password', postResetPassword)
routerLoginRegister.delete('/sign-out', deleteSingOut)

module.exports = routerLoginRegister;