const { Schema, model } = require ('mongoose');

const cardSchema = new Schema (
  {
    urlImage: {
      type: String, 
      required: false
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String, 
      required: true
    },
    email: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    },
    userId: {
      type: String,
      required: true
    }
  },

  {
    timestamps: true
  }
);

const CardModel = model ('Cards', cardSchema);

module.exports = CardModel;