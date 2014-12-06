var db = require('monk')('localhost/zeroD');
var _ = require('lodash');

module.exports = function (req, reply) {
  var users = db.get('users');
  users.findById(req.params.id, function(err, user){
      var query = { location:
              { $near :
                  {
                      $geometry: { type: "Point",  coordinates:  user.location.coordinates },
                      $maxDistance: 50
                  }
              }
         };
      
      users.find(query, function(err, nearUsers) {
          var res = _(nearUsers).filter(function(current){
              return current._id != req.params.id;
          }).map(function(usr){
              return {id: usr._id, nickname: usr.nickname};
          }).valueOf();
          reply(res);
      });    
  });
}