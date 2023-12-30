const { handleMangooseError } = require('../helpers');
const { Schema, model } = require('mongoose');

const friendSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title'],
    },
    url: {
      type: String,
      required: [true, 'Set url'],
    },
    addressUrl: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: [true, 'Set imageUrl'],
    },
    address: {
      type: String,
      required: false,
    },
    workDays: {
      type: [
        {
          isOpen: {
            type: Boolean,
          },
          from: String,
          to: String,
        },
      ],
      default: [],
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
  },
  { versionKey: false, timestamps: false },
);

friendSchema.post('save', handleMangooseError);

const Friend = model('friend', friendSchema);

module.exports = { Friend };
