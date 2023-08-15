const { Router } = require( 'express' );
const { getCards, insertCard } = require('../controllers/inicio.controller');


const router = Router();


/** 
 * Ruta actual: http://localhost:3000/api/inicio
 */

// Ruta para obtener todos los productos 
router.get (
    '/',
    getCards
);

//Ruta para crear card
router.post(
    '/',
    insertCard
);

module.exports = router;