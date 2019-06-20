'use strict';
module.exports = function(app) {
  var EvolutiveSMS = require('../controllers/EvolutiveSMSController');

  app.route('/send')
    .get(EvolutiveSMS.list_all_messages)
    .post(EvolutiveSMS.create_a_message);


  app.route('/send/:sendId')
    .get(EvolutiveSMS.read_a_message)
    .put(EvolutiveSMS.update_a_message)
    .delete(EvolutiveSMS.delete_a_message);
};
