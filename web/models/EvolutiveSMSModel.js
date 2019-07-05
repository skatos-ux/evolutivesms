'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LoginSchema = new Schema({
  login: {
    type: String,
    required: 'No login entered'
  },
  password: {
    type: String,
    required: 'No password entered'
  }
});

var UserSchema = new Schema({
  name: {
    type: String,
    required: 'No Name entered'
  },
  phone: {
    type: String,
    required: 'No phone entered'
  },
  g1: {
    type: String
  },
  g2: {
    type: String
  },
  g3: {
    type: String
  },
  g4: {
    type: String
  },
  g5: {
    type: String
  },
  g6: {
    type: String
  }
});

var ConfigSchema = new Schema({
  g1: {
    type: String,
    required: "No g1 entered"
  },
  g2: {
    type: String
  },
  g3: {
    type: String
  },
  g4: {
    type: String
  },
  g5: {
    type: String
  },
  g6: {
    type: String
  },
  iistrlezkdekf: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Login', LoginSchema);
module.exports = mongoose.model('Config', ConfigSchema);
