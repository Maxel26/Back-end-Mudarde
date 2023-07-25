const { Router } = require( 'express' );
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller');

const  router = Router();

//  http://localhost:3000/api/categories
router.get('/', getAllCategories);
router.post('/', createCategory);
router.patch('/:id',updateCategory);
router.delete('/:id',deleteCategory);


module.exports = router;