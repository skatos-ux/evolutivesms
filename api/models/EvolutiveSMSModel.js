'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SendSchema = new Schema({
  login: {
    type: String,
    required: 'No login entered'
  },
  password: {
    type: String,
    required: 'No password entered'
  },
  to: {
    type: String,
    required: 'No phone number entered'
  },
  message: {
    type: String,
    required: 'No message entered'
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Send', SendSchema);
