var request = require('request');
var server = require('../lib/server');
var expect = require('chai').expect;

describe('A server receiving a request', function () {
  before(function(){
    server.start();
  });

  it('Should login a new user', function () {

    var form = {
      nickname: 'mocha test',
      coords: [4,5]
    };

    request.post('http://localhost:8000/login', {form: form} , function (err, res, body){
      var body = JSON.parse(this.body);
      expect(this.res.statusCode).to.equal(200);
      expect(body.uuid).to.not.be.undefined();  

      done();
    });

    
  });
});