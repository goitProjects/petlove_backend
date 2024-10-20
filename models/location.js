const { Schema, model } = require('mongoose');

const locationSchema = new Schema(
  {
    useCounty: String,
    stateEn: String,
    cityEn: String,
    countyEn: String,
  },
  {
    versionKey: false,
  },
);

module.exports.Location = model('location', locationSchema);
