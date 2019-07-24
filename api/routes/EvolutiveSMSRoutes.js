'use strict';
module.exports = function(app) {
  var EvolutiveSMS = require('../controllers/EvolutiveSMSController');

  app.route('/send')
    .get(EvolutiveSMS.getmess)
    .post(EvolutiveSMS.sendmess)
    .delete(EvolutiveSMS.delmess);

};
