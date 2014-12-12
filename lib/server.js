module.exports = (function() {
  var Hapi = require('hapi');
  var server = new Hapi.Server(process.env.HOST || 'localhost', process.env.PORT || 8000);
  var io = require("socket.io")(server.listener);
  var db = require('monk')(process.env.DATABASE_URL || 'localhost/zeroD');

  io.on('connection', require('./socketHandler'));

  server.ext('onRequest', function (request, reply) {
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
    method: 'PUT',
    path: '/position/{id}',
    handler: require('./updatePosition')
  });

  server.route({
    method: 'POST',
    path: '/send',
    handler: require('./send')
  });

  server.route({
    method: 'GET',
    path: '/test',
    handler: function (req, reply) {
      console.log('test route');
      reply.file('index.html');
    }
  });

  return server;
})();
