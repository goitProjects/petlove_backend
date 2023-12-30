const { handleMangooseError } = require('../helpers');
const { Schema, model } = require('mongoose');
const species = require('../data/species');
const categories = require('../data/categories');
const sex = require('../data/sex');
const { regexs } = require('../data/regexs');

const noticeSchema = Schema(
  {
    species: {
      type: String,
      required: [true, 'Set species'],
      enum: species,
    },
    category: {
      type: String,
      required: [true, 'Set category'],
      enum: categories,
    },
    price: {
      type: Number,
      required: function () {
        return [this.category === 'sell', 'Set price'];
      },
    },
    title: {
      type: String,
      required: [true, 'Set title'],
    },
    name: {
      type: String,
      required: [true, 'Set name'],
    },
    birthday: {
      type: String,
      match: regexs.birthday,
      required: [true, 'Set birthday'],
    },
    comment: {
      type: String,
      default: '',
    },
    sex: {
      type: String,
      required: [true, 'Set sex'],
      enum: sex,
    },
    location: {
      type: String,
      ref: 'citie',
      required: [true, 'Set location'],
    },
    imgURL: {
      type: String,
      match: regexs.url,
      required: [true, 'Set imgURL'],
    },
    user: {
      type: String,
      ref: 'user',
      required: [true, 'Set user'],
    },
    popularity: {
      type: Number,
      required: [true, 'Set popularity'],
      default: 1,
    },
  },
  { versionKey: false, timestamps: true },
);

noticeSchema.post('save', handleMangooseError);

const Notice = model('notice', noticeSchema);

module.exports = { Notice };
