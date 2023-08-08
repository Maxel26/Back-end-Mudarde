const { Router } = require( 'express' );
const { createUser, loginUser, renewToken } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const validateInputFields = require('../middlewares/validate-input-fields.middleware');
const { validateToken } = require('../middlewares/validate-jwt.middleware');
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct, getProductsByUserId, getProductsByFamil } = require('../controllers/product.controller');

const router = Router();

/** 
 * Ruta actual: http://localhost:5000/api/products
 */

// Ruta para obtener todos los productos
router.get( 
    '/', 
    getProducts
);

// Ruta para obtener producto por ID
router.get( 
    '/:id', 
    getProductById
);
//Ruta para obtener productos por familia
router.get(
    '/family/:family',
    getProductsByFamil
);

// Ruta para obtener todos los productos de un usuario
router.get( 
    '/user/:id', 
    validateToken,
    getProductsByUserId
);

// Ruta para crear producto (Restringida)
router.post( 
    '/', 
    validateToken,
    createProduct
);

// Ruta para actualizar producto (Restringida)
router.patch( 
    '/:id', 
    validateToken,
    updateProduct
);

// Ruta para eliminar producto (Restringida)
router.delete( 
    '/:id', 
    validateToken,
    deleteProduct
);



module.exports = router;