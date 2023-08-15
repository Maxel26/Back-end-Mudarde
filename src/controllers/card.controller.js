const {response, request} = require ('express');
const { hashSync, genSaltSync, compareSync } = require( 'bcryptjs' );

const path = require( 'path' );
const { generateToken } = require( '../helpers/jwt.js' );

// TODO: completar esta variable con los servicios una vez esten creados los servicios
const {getCards, createCard, reviseCard, removeCard} = require ('../services/card.service.js');

const { PATH_STORAGE } = require( '../middlewares/upload-file.middleware.js' );

const User = require('../models/User.js');


const getAllCards = async (req = request, res = response) => {
  try {
    const data = await getCards ();

    res.status ( 200 ).json({
      ok: true,
      path: '/cards',
      msg: 'Obtiene todas las cards',
      cards: data
    })
  }

  catch ( error ) {
    console.log( error );
    return res.status( 500 ).json({
        ok: false,
        path: '/cards',
        msg: 'Error al obtener las cards'
    });  
  }
}


const insertCard = async (req = request, res = response) => {
  const inputData = req.body;
  // const userId = req.authUser.uid;

  // if (! req.file) {
  //   return res.status ( 400 ).json({error: 'Debes subir un archivo'});
  // }

  // if (! PATH_STORAGE ) {
  //   res.status( 500 ).json({
  //     ok: false,
  //     path: '/cards',
  //     msg: 'No se ha configurado correctamente la ruta de almacenamiento de archivos',
  // }); 
  // }

  // const filepath = path.join(PATH_STORAGE, req.file.filename);
  
  // const newCard = {... inputData, userId, urlImage: filepath };

  try {
    // const data = await createCard (newCard); 
    const data = await createCard (inputData); 

    res.status ( 200 ).json({
      ok: true,
      path: '/cards',
      msg: 'card creada exitosamente',
      // filepath,
      card: data
    });
  }
  catch ( error ) {
    console.log( error );
    return res.status( 500 ).json({
      ok: false,
      path: '/cards',
      msg: 'Error al crear card'
  });  
  }
}

const updateCard = async (req = request, res = response) => {
  const cardId = req.params.id;
  const inputData = req.body;
  const userId = req.authUser.uid;
  
  // if (! req.file) {
  //   return res.status ( 400 ).json({error: 'Debes subir un archivo'});
  // }

  // if ( ! PATH_STORAGE ) {
  //   res.status( 500 ).json({
  //       ok: false,
  //       path: '/cards',
  //       msg: 'No se ha configurado correctamente la ruta de almacenamiento de archivos',
  //   }); 
  // }

  // const filePath = path.join( PATH_STORAGE, req.file.filename );  

  // const checkCard = { ...inputData, userId, urlImage: filePath };
  
  try {
    const data = await reviseCard (cardId, userId, inputData );

    if( data ) {
      res.status( 200 ).json({
          ok: true,
          path: `/cards/${ cardId }`,
          msg: 'Actualiza card',
          card: data
      }); 
  }
  else {
      return res.status( 404 ).json({
          ok: false,
          path: `/cards/${ cardId }`,
          msg: 'card no encontrada'
      }); 
  }
  }

  catch ( error ) {
    console.log( error );
        return res.status( 500 ).json({
            ok: false,
            path: `/cards/${ cardId }`,
            msg: 'Error al actualizar card'
        });   
  }
}

const deleteCard = async (req = request, res = response) => {
  const cardId = req.params.id;
  const userId = req.authUser.uid;

  try {
    const data = await removeCard (cardId, userId);

    if (data) {
      res.status( 200 ).json({
        ok: true,
        path: `/cards/${ cardId }`,
        msg: 'Eliminar card',
        card: data
    }); 
    }
    else {
      return res.status( 404 ).json({
        ok: false,
        path: `/cards/${ cardId }`,
        msg: 'Card no encontrada'
      });
    }
  }

  catch (error) {
    console.log(error);
    return res.status( 500 ).json ({
      ok: false, 
      path: `/cards/${ cardId }`,
      msg: 'error al eliminar la card'
    })
  }
}

module.exports = {
  getAllCards,
  insertCard, 
  updateCard,
  deleteCard,
}


