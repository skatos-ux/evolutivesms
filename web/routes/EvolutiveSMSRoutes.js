'use strict';
module.exports = function(app) {
  var EvolutiveSMS = require('../controllers/EvolutiveSMSController');

  app.route('/')
    .get(EvolutiveSMS.login)
    .post(EvolutiveSMS.verify);

  app.route('/interface')
    .get(EvolutiveSMS.interface);

  app.route('/config')
    .post(EvolutiveSMS.setconfig);

  app.route('/users')
    .get(EvolutiveSMS.getusers)
    .put(EvolutiveSMS.insertusers)
    .post(EvolutiveSMS.setusers);
};
