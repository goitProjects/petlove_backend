const { handleMangooseError, HttpError } = require('../helpers');
const { Schema, model } = require('mongoose');

const citySchema = Schema(
  {
    _id: {
      type: String,
      required: true,
    },
   useCounty: {
      type: String,
      required: true,
    },
   stateEn: {
      type: String,
      required: true,
    },
 cityEn: {
      type: String,
      required: true,
    },
 countyEn: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

citySchema.post('save', handleMangooseError);

const City = model('citie', citySchema);

module.exports = { City };