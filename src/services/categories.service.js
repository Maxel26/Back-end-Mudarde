const Category = require("../models/category");

const getCategories = async () => {
    return await Category.find({});
};
// category {name : '', description : ''}
const insertCategory = async (category ) => {
    return await Category.create(category) ;
};

const reformCategory =  async (categoryId, updateData) => {
   return await Category.findOneAndUpdate(
        {_id: categoryId},    // 1. Encontrar la categoria (_id)
        updateData,               // 2. Los datos (objeto) por el que voy a remplazar los valores existentes
        {new : true} //pa que muestre los valores actualizados  // 3.(opcional) Establecer una config sobre la consulta
    );
};

const removeCategory = async (categoryId) => {
    return await Category.findOneAndRemove({_id: categoryId}) ;
};


module.exports = {
    getCategories,
    insertCategory,
    reformCategory,
    removeCategory
}