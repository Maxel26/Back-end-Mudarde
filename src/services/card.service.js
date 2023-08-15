const CardModel = require ('../models/card');

const getCards = async () => {
  return await CardModel.find({});
}

const createCard = async ( dataCard ) => {
  const newCard = new CardModel( dataCard );
  return await newCard.save(); 
}

const reviseCard = async ( cardId, userId, updateCard ) => {
  return await CardModel.findOneAndUpdate (
    { _id: cardId, userId },
    updateCard,
    {new: true}
  );
}

const removeCard = async (cardId, userId) => {
  return await CardModel.findOneAndRemove({_id: cardId, userId});
}



module.exports = {
  getCards,
  createCard, 
  reviseCard,
  removeCard
}