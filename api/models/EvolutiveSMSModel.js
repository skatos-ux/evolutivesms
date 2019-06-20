'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SendSchema = new Schema({
  login: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  password: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  to: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  message: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Send', TaskSchema);
