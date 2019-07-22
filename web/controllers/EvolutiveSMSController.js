'use strict';

var mongoose = require('mongoose'),
  Login = mongoose.model('Login'),
  User = mongoose.model('User'),
  Config = mongoose.model('Config');

var login;
var password;

exports.login = function(req, res) {
  res.render('login.ejs', {retry: false});
};

exports.verify = function(req, res) {
  Login.findOne({login: req.body.login, password: req.body.password}, function(err, user) {
    if (user) {
      login = req.body.login;
      password = req.body.password;
      return res.redirect('/interface');
    }
    else {
      res.render('login.ejs', {retry: true});
    }
  });
};

exports.getusers = function(req, res) {
  User.find({}, function(err, userlist) {
    Config.find({}, '-__v -_id -iistrlezkdekf -dkejfkthotjrr', function(err, configlist) {
      var list = [];
      list.push(userlist);
      list.push(configlist)
      res.send(list);
    });
  });
};

exports.rmusers = function(req, res) {
  User.remove({phone: req.body.phone}, function(err) {
    if (err)
      res.send(err);
    res.send("ok");
  });
};

exports.insertusers = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user){
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.setusers = function(req, res) {
  res.send("function not set yet..")
};

exports.setconfig = function(req, res) {
  Config.find({}, '-__v -_id', function(err, configlist) {
    if(configlist.length == 0){
      var new_config = new Config(req.body);
      new_config.save(function(err, config) {
        if (err)
          res.send(err);
        res.json(config);
      });
    }
    else {
      Config.find({}, function(err, configlist2) {
        var filter = { _id: configlist2[0]._id };
        Config.findOneAndUpdate(filter, req.body, function(err, nconfig) {
          if (err)
            res.send(err);
          res.send('ok');
        });
      });
    }
  });
};
exports.getconfig = function(req, res) {
  Config.find({}, '-__v -_id -iistrlezkdekf -dkejfkthotjrr', function(err, configlist) {
    if (err)
      res.send(err);
    res.json(configlist);
  });
}



exports.interface = function(req, res) {
  if(typeof login == "undefined" || typeof password == "undefined"){
    return res.redirect("/");
  }
  else {
    res.render('interface.ejs', {login: login, password: password});
  }
};
