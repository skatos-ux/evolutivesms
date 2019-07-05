'use strict';

var sudo = require('sudo-js');

var mongoose = require('mongoose'),
  Send = mongoose.model('Send'),
  Login = mongoose.model('Login');

// sudo-js local password
sudo.setPassword('nicodu24');

exports.getmess = function(req, res) {
  Send.find({}, '-password -__v',function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.sendmess = function(req, res) {
  Login.find({login: req.body.login, password: req.body.password}, function(err, user) {
    if(user){
      var new_message = new Send(req.body);
      new_message.save(function(err, task) {
        if (err)
          res.send(err);
        var command = ['python3', "python/class.py", req.body.to, req.body.message];
        sudo.exec(command, function(err, pid, result) {
          console.log(result);
          if(result.includes("OK")){
            res.send("ok");
          }
          else if (result.includes("ERROR")) {
            res.send("error");
          }
        });
      });
    }
  });
};
