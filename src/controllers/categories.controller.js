const { getCategories, insertCategory, removeCategory, reformCategory } = require("../services/categories.service");



const getAllCategories = async (req,res) => {
    try {
        const data = await getCategories();


        res.status(200).json({
            ok : true,
            path : '/categories',                       //lo que le ENVIAMOS al FRONT
            msg : 'Obtener todas las categorias ',
            categories: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok : false,
            path : '/categories',
            msg : 'Error al obtener todas las categorias '
        });
    }
} ;
const createCategory = async (req,res) => {
    const inputData = req.body ; 
    
    try {
        const data = await insertCategory(inputData);


        res.status(201).json({
            ok : true,
            path : '/categories',                       //lo que le ENVIAMOS al FRONT
            msg : 'crea categorias ',
            category: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok : false,
            path : '/categories',
            msg : 'Error al crear categorias '
        });
    }
} ;
const updateCategory = async (req,res) => {
    const categoryId = req.params.id ;
    const inputData = req.body ;    
    try {
        const data = await reformCategory(categoryId,inputData);

        res.status(200).json({
            ok : true,
            path : '/categories',                       //lo que le ENVIAMOS al FRONT
            msg : 'Actualiza categoria exitosamente',
            products: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok : false,
            path : '/categories',
            msg : 'Error al actualizar categorias '
        });
    }
} ;
const deleteCategory = async (req,res) => {
    const categoryId = req.params.id; 
    try {
        const data = await removeCategory(categoryId);

        res.status(200).json({
            ok : true,
            path : '/categories',                       //lo que le ENVIAMOS al FRONT
            msg : 'Elimina categoria exitosamente',
            products: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok : false,
            path : '/categories',
            msg : 'Error al eliminar categoria '
        });
    }
} ;

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
}