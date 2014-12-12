var db = require('monk')(process.env.DATABASE_URL || 'localhost/zeroD');
var queries = require('./queries');
var _ = require('lodash');

module.exports = function (req, reply) {
  var lat = parseFloat(req.payload.coords[0]);
  var lon = parseFloat(req.payload.coords[1]);
  
  var user = {
    nickname: req.payload.nickname,
    location : {
      type : "Point",
      coordinates : [lat, lon]
    }
  };

  var users = db.get('users');
  users.insert(user, function(err, doc){
    user._id = doc._id;

    users.find(queries.findNearbies(lat, lon), function(err, nearUsers) {
      _(nearUsers).filter(function(current) {
        return current._id != doc._id;
      }).forEach(function(nearUser) {
        req.io.to(nearUser.socketId).emit('new-user', { id: doc._id, nickname: doc.nickname });
      });
    });

    reply({message: 'welcome', uuid: user._id});
  });
};