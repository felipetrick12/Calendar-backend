const {Schema,model} = require('mongoose');



const EventoSchema = Schema({

    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    desc:{
        type:String,   
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

EventoSchema.method('toJSON',function () {
    const{_id,__v,...object} = this.toObject();
    object.id=_id;
    return object;

})


module.exports =model('Evento',EventoSchema);