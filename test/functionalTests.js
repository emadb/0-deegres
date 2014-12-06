var request = require('request');
var server = require('../lib/server');
var expect = require('chai').expect;

describe('A server receiving a request', function () {
  before(function(){
    server.start();
  });

  it('Should login a new user', function (done) {

    var form = {
      _id: 'test_user',
      nickname: 'mocha test',
      coords: [45.56377, 10.23138]
    };

    request.post('http://localhost:8000/login', {form: form} , function (err, res, body){
      expect(res.statusCode).to.equal(200);
      var parsedBody = JSON.parse(body);
      expect(parsedBody.uuid).to.not.be.undefined();  
      done();
    });
  });

  it('Should get the near users but not herself', function(done){
    request.get('http://localhost:8000/users/313131313131313131313131', function (err, res, body){
      expect(res.statusCode).to.equal(200); 
      var parsedBody = JSON.parse(body);
      expect(parsedBody.length).to.not.be.empty();
      parsedBody.forEach(function(user){
        expect(user._id).to.not.equal('313131313131313131313131');
      });
      done();
    });
  });
});