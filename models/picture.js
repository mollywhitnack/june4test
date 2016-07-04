'use strict';

const mongoose = require('mongoose');

let pictureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: String
});

let Picture;

Picture =  mongoose.model('Picture', pictureSchema);

module.exports = Picture;