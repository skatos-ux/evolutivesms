'use strict';
module.exports = function(){

  var mongoose = require('mongoose'),
    Config = mongoose.model('Config');

  var GetMAC = require('getmac'),
      GetInternet = require('dns');

  var request = require('request');
  Config.find({}, 'ajdizhdbzgoor', function(err, configlist) {
    var security = configlist[0].ajdizhdbzgoor;
    if (security == 'on'){
      GetInternet.resolve('www.ait37.fr',function(err) {
          if (err) {
            GetMAC.getMac(function(err, macAddress){
                if (err)  throw err
                Config.findOne({iistrlezkdekf: macAddress}, function(err, match) {
                  if(!match){
                    console.log("SYSTEM VIOLATION");
                    process.exit(1);
                  }
                });
            });
          } else {
            Config.find({}, '-__v -_id -iistrlezkdekf', function(err, configlist) {
              var key = configlist[0].dkejfkthotjrr;
              request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://ait37.fr/smsbox/authenticate.php',
                body:    "auth=" + key
              }, function(error, response, body){
                if(body != 1){
                  console.log("SYSTEM VIOLATION");
                  process.exit(1);
                }
              });
            });
          }
      });
    } else {
      console.log("Be carefull security is disabled !");
    }
  });
}
