module.exports = (function() {
    var Hapi = require('hapi');
    var server = new Hapi.Server('localhost', 8000);
    var db = require('monk')('localhost/zeroD');

    server.route({
        method: 'POST',
        path: '/login',
        handler: function (req, reply) {
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
        }
    });

    server.route({
        method: 'GET',
        path: '/users/{id}',
        handler: function (req, reply) {
            var users = db.get('users');
            users.findById(req.params.id, function(err, user){
                var query = {
                     location:
                       { $near :
                          {
                            $geometry: { type: "Point",  coordinates:  user.location.coordinates },
                            $maxDistance: 50
                          }
                       }
                   };
                
                users.find(query, function(err, nearUsers) {
                    reply(nearUsers);
                });    
            });
    }});

    return {
        start: function() {server.start();}
    }
})();