var request = require('request');
var http = require('request-mocha')(request);
var server = require('../lib/server');
var expect = require('chai').expect;

describe('A server receiving a request', function () {
  before(function(){
    server.start();
  });

  http.save({
    method: 'POST',
    url: 'http://localhost:8000/login',
    form: {
      nickname: 'mocha test',
      coords: [4,5]
    }
  });
  
  it('Should login a new user', function () {
    var body = JSON.parse(this.body);
    expect(this.res.statusCode).to.equal(200);
    expect(body.uuid).to.not.be.undefined();
  });
});