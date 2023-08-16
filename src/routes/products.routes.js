const { Router } = require( 'express' );
const { validateToken } = require('../middlewares/validate-jwt.middleware');
const { getProducts, getProductById, updateProduct, deleteProduct, getProductsByUserId, getProductsByFamil, create2Product } = require('../controllers/product.controller');

const {  multerMiddleware  } = require( '../middlewares/upload-file-2.middleware');

const router = Router();

const testUpload = (req, res, next) => {
    multerMiddleware.single('urlImage')(req, res, (err) => {
      if (err) {
        console.log('Multer error:', err);
      }
      next();
    });
  };

/** 
 * Ruta actual: http://localhost:3000/api/products
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
    multerMiddleware.single( 'urlImage' ),
    create2Product
);

// router.post( 
//     '/', 
//     validateToken,
//     createProduct
// );

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