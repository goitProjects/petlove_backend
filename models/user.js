const { handleMangooseError, HttpError } = require('../helpers');
const { Schema, model } = require('mongoose');
const { regexs } = require('../data/regexs');
const Joi = require('joi');

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name'],
    },
    email: {
      type: String,
      match: regexs.email,
      unique: true,
      required: true,
    },
    avatar: {
      type: String,
      validate: {
        validator: function (value) {
          return !value || regexs.url.test(value);
        },
        message: 'Invalid avatar URL',
      },
      default: '',
    },
    phone: {
      type: String,
      validate: {
        validator: function (value) {
          return !value || regexs.phone.test(value);
        },
        message: 'Invalid phone number',
      },
      default: '',
    },
    password: {
      type: String,
      minlength: 7,
      required: true,
    },
    token: {
      type: String,
      default: '',
    },
    noticesViewed: {
      type: [{ type: String, ref: 'notice' }],
      default: [],
      required: true,
    },
    noticesFavorites: {
      type: [{ type: String, ref: 'notice' }],
      default: [],
      required: true,
    },
    pets: {
      type: [{ type: Schema.Types.ObjectId, ref: 'pet' }],
      default: [],
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleMangooseError);

const signupSchema = Joi.object({
  name: Joi.string().required().empty(false).messages({
    'string.base': 'The name must be a string.',
    'any.required': 'The name field is required.',
    'string.empty': 'The name must not be empty.',
  }),
  email: Joi.string().pattern(regexs.email).required().empty(false).messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.empty': 'The email must not be empty.',
    'string.pattern.base': 'The email must be in format test@gmail.com.',
  }),
  password: Joi.string().min(7).required().empty(false).messages({
    'string.base': 'The password must be a string.',
    'any.required': 'The password field is required.',
    'string.empty': 'The password must not be empty.',
    'string.min': 'The password must be not less 7 symbols.',
  }),
});
const signinSchema = Joi.object({
  email: Joi.string().pattern(regexs.email).required().empty(false).messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.empty': 'The email must not be empty.',
    'string.pattern.base': 'The email must be in format test@gmail.com.',
  }),
  password: Joi.string().min(7).required().empty(false).messages({
    'string.base': 'The password must be a string.',
    'any.required': 'The password field is required.',
    'string.empty': 'The password must not be empty.',
    'string.min': 'The password must be not less 7 symbols.',
  }),
});
const updateUserSchema = Joi.object({
  name: Joi.string().messages({
    'string.base': 'The name must be a string.',
  }),
  email: Joi.string().pattern(regexs.email).messages({
    'string.base': 'The email must be a string.',
    'string.pattern.base': 'The email must be in format test@gmail.com.',
  }),
  phone: Joi.string().pattern(regexs.phone).messages({
    'string.base': 'The phone must be a string.',
    'string.pattern.base': 'The phone must be in format +38XXXXXXXXXX',
  }),
  avatar: Joi.string().pattern(regexs.url).messages({
    'string.base': 'The avatar must be a string.',
    'string.pattern.base': 'The avatar must be in format https://XXXX.png|jpg|jpeg|gif|bmp|webp',
  }),
});

const User = model('user', userSchema);
const schemas = { signupSchema, signinSchema, updateUserSchema };

module.exports = { User, schemas };
