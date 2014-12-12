var db = require('monk')(process.env.DATABASE_URL || 'localhost/zeroD');

module.exports = function(socket) {
    console.log('a user connected');

    socket.on('request-connection', function(data) {
      var users = db.get('users');
      users.update({_id:data.uuid}, {$set: {socketId:socket.id}});
    });

    socket.on('disconnect', function(data) {
      console.log('a user disconnected');
      var users = db.get('users');

// TODO: don't delete user, mark as inactive (and change the queries in other modules)
      //users.update({socketId: socket.id}, {$set: {inactive: true}});

      users.remove( { socketId: socket.id }, function(err) {
        if(err) {
          console.log("Error while attempting to remove user: " + err);
        }
      });
    });
};