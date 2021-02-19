const {response} = require('express');
const jwt= require('jsonwebtoken')

const validarJWT =( req,res=response,next ) => {

        const token = req.header('x-token')

        if(!token){
            return res.status(401).json({
                ok:false,
                msg: 'no ha token en la peticion'
            })
        }


        try {
            
            const {uid,name} =jwt.verify(
                token,
                process.env.Secret_JWT
            )

            req.uid=uid;
            req.name= name;


        } catch (error) {
            return res.status(401).json({
                ok:false,
                msg: 'token no valido'
            })
        }



         next();
}


module.exports = { validarJWT}