const {response}= require('express'); //para traer nuestra intelligence de js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req,res= response) => {

    const {email,password} = req.body;
    try {
        
        let usuario = await Usuario.findOne({email});

        if(usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'un usuario tiene este email'
            })
        }
       
    usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();  //encriptar string
    usuario.password =bcrypt.hashSync(password,salt); //la password que tiene la base de datos la encripta,gracias a las rondas del gensaltsync

    await usuario.save(); //guarda el usuario que se le esta enviando por postman a mongo

    const token = await generarJWT(usuario.id,usuario.name) //guarda el token creado

     res.status(201).json({
         ok:true,
         uid: usuario.id,
         name: usuario.name,
         token
     });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'servidor caido'
        })
    }
}

const loginUsuario = async (req,res= response) => {
    
    const {email,password} = req.body;

    try {
        const usuario = await Usuario.findOne({email});

        if(!usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'el usuario no existe con ese email'
            })
        }


        const validPassword = bcrypt.compareSync(password,usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'password incorrecto'
            })
            
        }

        const token = await generarJWT(usuario.id,usuario.name)
        
        res.json ({
            ok:true,
            uid: usuario.id,
            name:usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'servidor caido'
        })
    }
}

const revalidarToken =  async (req,res= response) => {

    const uid= req.uid;
    const name= req.name;

    const token = await generarJWT(uid,name)

    res.json({
        ok:true,
        msg: 'renew',
        uid,
        name,
        token
    })
}



module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken

}
