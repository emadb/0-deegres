var db = require('monk')(process.env.DATABASE_URL || 'localhost/zeroD');

module.exports = function (req, reply) {
  var users = db.get('users');
  var user = {
    nickname: req.payload.nickname,
    location : {
      type : "Point",
      coordinates : [parseFloat(req.payload.coords[0]), parseFloat(req.payload.coords[1])]
    }
  };

  users.insert(user, function(err, doc){
    user._id = doc._id;
    reply({message: 'welcome', uuid: user._id});
  });
};