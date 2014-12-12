var db = require('monk')(process.env.DATABASE_URL || 'localhost/zeroD');
var queries = require('./queries');
var _ = require('lodash');

module.exports = function(req, reply) {

  // TODO: passare le coordinate
  var users = db.get('users');
  users.findById(req.params.id, function(err, user) {
    var query = queries.findNearbies(user.location.coordinates[0], user.location.coordinates[1]);
      
    users.find(query, function(err, nearUsers) {
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
  });
};
