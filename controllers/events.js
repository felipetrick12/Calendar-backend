const {response}= require('express');
const Evento = require('../models/Evento');





const getEventos = async (req,res= response) => { 

    const eventos = await Evento.find().populate('user','name');

     res.status(401).json({
        ok:true,
       eventos

    })

}

const crearEvento = async (req,res= response) => { 

    const evento = new Evento(req.body);
    

   try {

       evento.user = req.uid;
       const eventoDB = await evento.save();
       
       res.status(401).json({
           ok:true,
           evento: eventoDB
       })

   } catch (error) {
       console.log(error)
        return res.status(500).json({
        ok:true,
        msg: 'hable con el administrador'
    })
   }

}


const actualizarEvento = async (req,res= response) => { 

    const eventoID = req.params.id;
    const uid =req.uid;

    try {
       
    const evento = await Evento.findById(eventoID);
    
        if(!evento) {
             return res.status(404).json({
                ok:false,
                msg: 'No se encontro el ID del evento'
            })
        }
    
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg: 'No tiene permiso para editar este evento'
            })
        }
    
        const nuevoEvento = {
            ...req.body,
            user:uid
        }
    
        const eventoActualizado =await Evento.findOneAndUpdate(eventoID,nuevoEvento,{new:true});
         
        res.status(200).json({
            ok:true,
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }
  

}


const eliminarEvento = async (req,res= response) => { 

    const eventoID = req.params.id;
    const uid =req.uid;

    try {

        const evento = await Evento.findById(eventoID);

        if(!eventoID){
            return response.status(404).json({
                ok:false,
                msg : 'no se encontro un evento con ese id'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg: 'No tiene permiso para eliminar este evento'
            })
        }

        const eventoEliminado = await Evento.findOneAndDelete(eventoID);
         
        res.status(200).json({
            ok:true,
            eventoEliminado
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg : 'hable con el administrador'
        })
        
    }

}


module.exports= {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

}