'use strict';

var sudo = require('sudo-js');

var mongoose = require('mongoose'),
  Send = mongoose.model('Send'),
  Login = mongoose.model('Login');

// sudo-js local password
sudo.setPassword('MdpPa55');

exports.getmess = function(req, res) {
  Send.find({}, '-password -__v',function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delmess = function(req, res) {
  Send.remove({},function (err, task){
    if (err)
      res.send(err);
    res.send('ok');
  });
};

exports.sendmess = function(req, res) {
  Login.findOne({login: req.body.login, password: req.body.password}, function(err, user) {
    if(user){
      var command = ['python3', "python/class.py", req.body.to, req.body.message];
      sudo.exec(command, function(err, pid, result) {
        console.log(result);
        var commentaire;
        if (result.includes("USE ERR")) {
          res.send("useerr");
          commentaire = "Aucun SMS n'a été envoyé, un autre envoi de SMS était en cours";
        }
        else if(result.includes("ERROR")){
          var missing = result.split(": ")
          res.send("error: " + missing[1]);
          commentaire = "Une erreur mineure à été rencontrée pendant l'envoi, ces personnes n'ont pas reçu le SMS: " + missing[1];
        }
        else if(result.includes("PART ERR")) {
          var missing = result.split(": ")
          res.send("parterr: " + missing[1]);
          commentaire = "Une erreur mineure à été rencontrée pendant l'envoi, ces personnes n'ont pas reçu le SMS: " + missing[1];
        }
        else if(result.includes("OK")) {
          res.send("ok");
          commentaire = "Tous les SMS ont été envoyés";
        }
        req.body.commentaire = commentaire;
        var new_message = new Send(req.body);
        new_message.save(function(err, task) {
        });
      });
    }
    else{
      res.send("login error");
    }
  });
};
