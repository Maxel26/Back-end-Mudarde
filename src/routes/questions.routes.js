const { Router } = require ('express');

const {validateToken} = require ('../middlewares/validate-jwt.middleware');

const {getAllQuestions, insertQuestion, reviseQuestion, deleteQuestion} = require ('../controllers/questions.controller');

// const {  multerMiddleware  } = require( '../middlewares/upload-file.middleware.js' );

// const testUpload = (req, res, next) => {
//   multerMiddleware.single('urlImage')(req, res, (err) => {
//     if (err) {
//       console.log('Multer error:', err);
//     }
//     next();
//   });
// };

const router = Router(); 

// Ruta actual: http://localhost:5000/api/questions

router.get (
  '/', 
  getAllQuestions
  );
router.post (
  '/', 
  validateToken,
  insertQuestion
  );
router.patch(
  '/:id', 
  validateToken,
  reviseQuestion
  );
router.delete(
  '/:id',
  validateToken,
  deleteQuestion
  );

module.exports = router