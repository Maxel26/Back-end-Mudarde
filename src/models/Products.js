/** La estructura que definamos aqui se vera reflejada en nuestra base de datos */
const { Schema, model } = require( 'mongoose' );


/** Define estructura de datos en la base de datos requerida por Mongoose*/
const productSchema = new Schema(
    // Objeto principal definira atributos del modelo
    {
        family: {
            type : String,
            required : true
        },
        urlImage: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        /** Atributos vinculantes */ 
        userId: {
            type: String,
            required: true
        }
    },
    // Definira configuraciones que se pueden aplicar en Mongoose para ese objeto
    {
        timestamps: true // hora creacion y modificacion
    }
);

/** Define el Modelo a partir de la estructura requerida por Mongoose */
const ProductModel = model( 'Products', productSchema  );


module.exports = ProductModel;