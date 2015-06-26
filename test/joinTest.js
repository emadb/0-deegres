var request = require('request');
var server = require('../app/server');
var expect = require('chai').expect;

describe('A server receiving a request', function() {
  before(function() {
      server.start();
  });

  it('A new user should be able to join', function(done) {

    var form = {
      nickname: 'mocha test',
      coords: [45.56377, 10.23138]
    };

    request.post('http://localhost:3000/join', { form: form }, function(err, res, body) {
      expect(res.statusCode).to.equal(200);
      var parsedBody = JSON.parse(body);
      console.log(parsedBody);
      //expect(parsedBody.uuid).to.not.be.undefined();
      done();
    });
  });
});