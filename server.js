module.exports = (function() {
    var Hapi = require('hapi');
    var server = new Hapi.Server('localhost', 8000);
    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/zeroD');

    var userSchema = mongoose.Schema({
        nickname: String,
        location: { type : Object }
    });

    var User = mongoose.model('User', userSchema);

    server.route({
        method: 'POST',
        path: '/login',
        handler: function (req, reply) {
            var user = new User();
            console.log(req.payload);
            user.nickname = req.payload .nickname;
            user.location = {
                type : "Point",
                coordinates : req.payload.coords
            };
            user.save();
            console.log(user);
            reply({message: 'welcome', uuid: user._id});
        }
    });

    // server.route({
    //     method: 'GET',
    //     path: '/users/{id}',
    //     handler: function (req, reply) {
    //         var user = User.findOne({'_id': req.params.id})
    //         Users.find({
    //           $near: {
    //              $geometry: {
    //                 type: "Point" ,
    //                 coords: user.location
    //              },
    //              $maxDistance: 50
    //           }
    //         }
    //     });

    return {
        start: function() {server.start();}
    }
})();