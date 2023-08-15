const {Schema, model} = require('mongoose');

const inicioSchema = new Schema (
    {
        name : {
            type : String,
            require : false
        },
        description: {
            type : String,
            required : false
        },
        urlImg : {
            type : String,
            required : false  
        }
    },
    {
        timestamps: true
    }
);

const InicioModel = model('Inicio', inicioSchema );

module.exports = InicioModel;