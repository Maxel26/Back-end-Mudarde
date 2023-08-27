const { response, request, json } = require ('express');

const { hashSync, genSaltSync, compareSync } = require('bcryptjs');

const path = require( 'path' );

const { generateToken } = require ('../helpers/jwt.js');

const {getQuestions, createQuestion, updateQuestion, removeQuestion } = require('../services/questions.service.js'); 

const { PATH_STORAGE } = require( '../middlewares/upload-file-2.middleware.js' );


// TODO: verificar despues de creado el controlador este conectado con las rutas
// TODO: verificar despues de creados los servicios que estos se conectan con los controladores

const getAllQuestions = async (req = request, res = response) => {
  try {
    const question = await getQuestions ();

    res.status ( 200 ).json ({
      ok: true,
      path: '/questions',
      msg: 'Obtiene todas las preguntas',
      // TODO: Verificar el tipado despues
      questions: question 
    });
  }
  catch (error) {
    console.log( error );
    return res.status( 500 ).json({
      ok: false, 
      path: '/questions',
      msg: 'Error al obtener las preguntas'
    });
  }
}

const insertQuestion = async ( req = request, res = response ) => {

  const inputData = req.body; 
  const userId = req.authUser.uid;
  console.log(inputData);

  const newQuestions = {
    question: inputData.question,
    answer: inputData.answer,
    userId
  }

  try {
    const question = await createQuestion  ( newQuestions );
    res.status( 201 ).json ({
      ok: true,
      path: '/questions',
      msg: 'Crea pregunta',
      questions: question
    })
  }

  catch (error) {
    console.log(error);
    return res.status (500).json ({
      ok: false,
      path: '/questions',
      msg: 'Error al crear la pregunta'
    })
  }
}

const reviseQuestion  = async (req = request, res = response) => {
  const inputData = req.params.id;
  const questionBody = req.body;
  const userId = req.authUser.uid; 

  try {
    const question = await updateQuestion (inputData, questionBody, userId);
    res.status( 201 ).json ({
      ok: true,
      path: '/questions/123',
      msg: ' pregunta Actualizada',
      questions: question
    })
  }

  catch ( error ) {
    console.log( error );
    return res.status (500).json ({
      ok: false,
      // TODO: verificar con al momento de hacer las pruebas si es necesario utilizar Id o no
      path: '/questions/123',
      msg: 'Error al actualizar pregunta'
    })
  }
}

const  deleteQuestion = async (req = request, res = response) => {
  const questionId = req.params.id;
  const userId = req.authUser.uid;


  try {
    const question = await  removeQuestion  (questionId, userId);

    if (question){
      res.status ( 200 ).json ({
        ok: true, 
        path: `/questions/${questionId}`,
        msg: 'Eliminar pregunta',
        questions: question
      })
    }
    else {
      return res.status( 404 ).json({
          ok: false,
          path: `/products/${ productId }`,
          msg: 'Pregunta no encontrada'
      });    
  }
  }
  catch ( error ) { 
    console.log(error);
    return res.status(500).json({
      ok: false,
      path: '/questions/123',
      msg: 'Error al eliminar la pregunta'
    })
  }
}

module.exports = {
  getAllQuestions,
  insertQuestion,
  reviseQuestion,
  deleteQuestion
}



