const questionModel = require("../models/questions");

const getQuestions = async (question) => {
  return await questionModel.find({})
}

const createQuestion = async (question) => {

  const newQuestion = new questionModel(question)

  return await  newQuestion.save ();
}

const updateQuestion = async (questionId, updateData) => {
  return await questionModel.findOneAndUpdate(
   {_id: questionId,},
   updateData,
   {new: true}
  )
} 

const removeQuestion = async (questionId) => {
  return await questionModel.findByIdAndRemove({_id: questionId})
}

module.exports = {
  getQuestions,
  createQuestion,
  updateQuestion,
  removeQuestion
}

