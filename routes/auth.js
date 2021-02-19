const {Router} = require('express');
const router = Router();
const {check } = require('express-validator');
const { customValidator } = require('../middleware/customValidator');
const { validarJWT } = require('../middleware/validarJWT');

const {crearUsuario,loginUsuario,revalidarToken} = require('../controllers/auth')


    router.post(
    '/new',
    [
    check('name','el nombre es obligatoriom,mayor a 2 caracteres').not().isEmpty(),
    check('email','no es un email, no existe email').isEmail().not().isEmpty(),
    check('password','contraseña obligatoria').not().isEmpty(),
    customValidator
    ],
    crearUsuario );

    router.post(
    '/', 
    [
        check('email','email obligatorio').isEmail().not().isEmpty(),
        check('password','contraseña mayor de 6 caracteres').isLength({ min: 6 }),
        customValidator
        
    ],
    loginUsuario 
    );


    router.get('/renew',validarJWT,revalidarToken);

module.exports= router;