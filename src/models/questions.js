const { Schema, model } = require("mongoose");

const questionSchema = new Schema ({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String, 
    required: true
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

const questionModel = model ( 'question', questionSchema );

module.exports = questionModel; 

