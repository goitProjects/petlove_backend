const { handleMangooseError, HttpError } = require('../helpers');
const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { regexs } = require('../data/regexs');
const species = require('../data/species');
const sex = require('../data/sex');

const petSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name'],
    },
    title: {
      type: String,
      required: [true, 'Set title'],
    },
    imgURL: {
      type: String,
      match: regexs.url,
      required: [true, 'Set imgURL'],
    },
    species: {
      type: String,
      required: [true, 'Set species'],
      enum: species,
    },
    birthday: {
      type: String,
      match: regexs.birthday,
      required: [true, 'Set birthday'],
    },
    sex: {
      type: String,
      required: [true, 'Set sex'],
      enum: sex,
    },
    owner: {
      type: String,
      ref: 'user',
      required: [true, 'Set user'],
    },
  },
  { versionKey: false, timestamps: true },
);

petSchema.post('save', handleMangooseError);

const addPetSchema = Joi.object({
  name: Joi.string().required().empty(false).messages({
    'string.base': 'The name must be a string.',
    'any.required': 'The name field is required.',
    'string.empty': 'The name must not be empty.',
  }),
  title: Joi.string().required().empty(false).messages({
    'string.base': 'The title must be a string.',
    'any.required': 'The title field is required.',
    'string.empty': 'The title must not be empty.',
  }),
  imgURL: Joi.string().pattern(regexs.url).messages({
    'string.base': 'The imgURL must be a string.',
    'string.pattern.base': 'The imgURL must be in format https://XXXX.png|jpg|jpeg|gif|bmp|webp',
  }),
  species: Joi.string()
    .valid(...species)
    .required()
    .empty(false)
    .messages({
      'string.base': 'The species must be a string.',
      'any.only':
        'Invalid species. Allowed values are "dog", "cat", "monkey", "bird", "snake", "turtle", "lizard", "frog", "fish", "ants", "bees" , "butterfly", "spider", "scorpion"',
      'any.required': 'The species field is required',
      'string.empty': 'The species must not be empty.',
    }),
  birthday: Joi.string().pattern(regexs.birthday).messages({
    'string.base': 'The birthday must be a string.',
    'string.pattern.base': 'The birthday must be in format YYYY-MM-DD',
  }),
  sex: Joi.string()
    .valid(...sex)
    .required()
    .empty(false)
    .messages({
      'string.base': 'The sex must be a string.',
      'any.only': 'Invalid sex. Allowed values are "unknown","female", "male", "multiple"',
      'any.required': 'The sex field is required',
      'string.empty': 'The sex must not be empty.',
    }),
});

const Pet = model('pet', petSchema);
const schemas = { addPetSchema };

module.exports = { Pet, schemas };
