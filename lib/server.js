module.exports = (function() {
  var Hapi = require('hapi');
  var server = new Hapi.Server('localhost', 8000);

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

  return server;
})();
