'use strict';


var mongoose = require('mongoose'),
  Send = mongoose.model('Send');

exports.list_all_messages = function(req, res) {
  Send.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_message = function(req, res) {
  var new_message = new Send(req.body);
  new_message.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });

};


exports.read_a_message = function(req, res) {
  Send.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_message = function(req, res) {
  Send.findOneAndUpdate({_id: req.params.messageId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_message = function(req, res) {
  Send.deleteOne({
    _id: req.params.sendId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Message successfully deleted' });
  });
};
