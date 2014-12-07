module.exports = (function() {
  var Hapi = require('hapi');
  var server = new Hapi.Server('localhost', 8000);
  var io = require("socket.io")(server.listener);
  var db = require('monk')('localhost/zeroD');
  var socketIo;

  io.on('connection', function(socket){
    console.log('a user connected');
    socketIo = socket;
    socket.on('request-connection', function(data){
      var users = db.get('users');
      users.update({_id:data.uuid}, {$set: {socketId:socket.id}});
    });
  });

  server.ext('onRequest', function (request, reply) {
    request.socket = socketIo;
    request.io = io;
    reply();
  });

  server.route({
    method: 'POST',
    path: '/login',
    handler: require('./login')
  });

  server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: require('./nearUsers')
  });

  server.route({
    method: 'POST',
    path: '/send',
    handler: require('./send')
  });

  return server;
})();
