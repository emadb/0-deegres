var db = require('monk')(process.env.DATABASE_URL || 'localhost/zeroD');

module.exports = function(socket) {
    console.log('a user connected');
    socketIo = socket;

    socket.on('request-connection', function(data) {
      var users = db.get('users');
      users.update({_id:data.uuid}, {$set: {socketId:socket.id}});
    });

    socket.on('disconnect', function(data) {
      console.log('a user disconnected');
      var users = db.get('users');

      users.remove( { socketId: socket.id }, function(err) {
        if(err) {
          console.log("Error while attempting to remove user: " + err);
        }
      });
    });
};