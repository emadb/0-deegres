var db = require('monk')(process.env.DATABASE_URL || 'localhost/zeroD');
var queries = require('../queries');
var _ = require('lodash');

module.exports = function (req, reply) {
  var users = db.get('users');
  var lat = parseFloat(req.payload.coords[0]);
  var lon = parseFloat(req.payload.coords[1]);

  users.find(queries.findNearbies(lat, lon), function(err, nearUsers) {
    var res = _(nearUsers).filter(function(current) {
      return current._id != req.params.id;
    }).map(function(usr) {
      return {
        id: usr._id,
        nickname: usr.nickname
      };
    }).valueOf();
    
    reply(res);
  });

};