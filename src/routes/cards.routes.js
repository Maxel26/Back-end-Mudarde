const { Router } = require ('express');

const {validateToken} = require ('../middlewares/validate-jwt.middleware');

// todo: modificar la importación de los controladores una vez creados estos
const {getAllCards, insertCard, updateCard, deleteCard} = require ('../controllers/card.controller');

const {  multerMiddleware  } = require( '../middlewares/upload-file-2.middleware' );

const testUpload = (req, res, next) => {
  multerMiddleware.single('urlImage')(req, res, (err) => {
    if (err) {
      console.log('Multer error:', err);
    }
    next();
  });
};

/** 
 * Ruta actual: http://localhost:5000/api/cards
 */


const router = Router(); 
// TODO: valdiar esta parte del codigo una vez creados los controladores
router.get (
  '/', 
  getAllCards, 
  );
router.post (
  '/', 
  validateToken,
  // multerMiddleware.single('urlImage'), 
  insertCard
  );
router.patch(
  '/:id', 
  validateToken,
  // multerMiddleware.single('urlImage'), 
  updateCard
  );
router.delete(
  '/:id',
  validateToken,
  deleteCard
  );

module.exports = router