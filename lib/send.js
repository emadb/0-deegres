var db = require('monk')(process.env.DATABASE_URL || 'localhost/zeroD');

module.exports = function (req, reply) {
  var messages = db.get('messages');
  var users = db.get('users');
  
  users.findById(req.payload.senderId, function(err, sender){

    req.payload.recipients.forEach(function(rec){
      users.findById(rec, function(err, user){
        if (user){
          req.io.to(user.socketId).emit('new-message', {from: {id: sender.id, nickname: sender.nickname}, msg: req.payload.msg});
        }
      });
    });  
  });

  messages.insert(req.payload, function(err, doc){
    reply({message: 'ok', msgid: doc._id});
  });
};