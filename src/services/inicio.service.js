const InicioModel = require("../models/inicio")


const getAllCards = async ( CardId) => {
    return await InicioModel.find({});
}

const createCard = async (card) => {
    return await InicioModel.create(card)
}


module.exports = {
    getAllCards,
    createCard
};