const mongoose = require ('mongoose');


const dbConection = async ()=> {

    try {
    
      await  mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex : true,
            useFindAndModify: false
        
        });

        console.log('DB online')


    } catch (error) {
        console.log(error);
        throw new Error ('error al inicializar base de datos ')
    }
}

module.exports = {
    dbConection
}