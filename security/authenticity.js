'use strict';
module.exports = function(){

  var mongoose = require('mongoose'),
    Config = mongoose.model('Config');

  var GetMAC = require('getmac'),
      GetInternet = require('dns');

  var request = require('request');

  GetInternet.lookup('google.com',function(err) {
      if (err && err.code == "ENOTFOUND") {
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
            url:     'https://ait37.fr/smsbox/authenticate.php',
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
}
