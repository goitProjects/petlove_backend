const { handleMangooseError } = require('../helpers');
const { Schema, model } = require('mongoose');

const newSchema = Schema(
  {
    imgUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: false },
);

newSchema.post('save', handleMangooseError);

const News = model('new', newSchema);

module.exports = { News };
