var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'POST',
    path: '/join',
    handler: function (request, reply) {
        reply({pippo: 'poppo', uuid: '11'})
    }
});

function start(){
  server.start(function () {
      console.log('Server running at:', server.info.uri);
  });
}

module.exports = {start: start };