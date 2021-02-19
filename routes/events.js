const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();
const {getEventos,crearEvento,actualizarEvento,eliminarEvento} =require('../controllers/events');
const {isDate} = require('../helpers/isDate');
const { customValidator } = require('../middleware/customValidator');
const { validarJWT } = require('../middleware/validarJWT');


router.use(validarJWT); //cualquier peticion que este debjao tiene que validar que tenga un token


router.get(
    '/',
    [
        
    ],
    getEventos
    );

router.post(
    '/',
    [
        check('title','Titulo 0bligatorio').not().isEmpty(),
        check('start','Fecha Inicio Obligatoria').custom(isDate),
        check('end','Fecha Fin Obligatoria').custom(isDate),
        customValidator
    ],
    crearEvento
    );

router.put(
    '/:id',
    [
        check('title','Titulo 0bligatorio').not().isEmpty(),
        check('start','Fecha Inicio Obligatoria').custom(isDate),
        check('end','Fecha Fin Obligatoria').custom(isDate),
        customValidator
    ],
    actualizarEvento);

router.delete('/:id',eliminarEvento);


module.exports= router;