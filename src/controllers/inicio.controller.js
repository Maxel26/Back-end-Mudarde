const { request, response } = require("express");
const { getAllCards,createCard } = require( '../services/inicio.service' );


const getCards = async ( req = request, res = response) => {
    try {
        const data = await getAllCards()   // Pendiente

        res.status( 201 ).json({
            ok: true,
            path: '/products',
            msg: 'Obtiene todas las cards',
            cards: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: '/products',
            msg: 'Error al obtener todas las cards'
        });    
    }
};

const insertCard = async ( req = request, res = response ) => {
    const inputData = req.body;
    // const userId = req.authUser.uid;

    try {
        // inputData.userId = userId;

        const data = await createCard(inputData)

        res.status( 201 ).json({
            ok: true,
            path: '/inicio',
            msg: 'Crea producto',
            card: data
        }); 
    } 
    catch ( error ) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: '/inicio',
            msg: 'Error al crear producto'
        });    
    }

}

module.exports = {
    getCards,
    insertCard
}