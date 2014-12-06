var db = require('monk')('localhost/zeroD');
var users = db.get('users');
users.drop();

var count = 0;
var oneMeter = 0.00001;

users.insert({ nickname: 'user' + count++,
  location: {type : "Point", coordinates : [45.56376, 10.23136]}
});

users.insert({ nickname: 'user' + count++,
  location: {type : "Point", coordinates : [45.56369, 10.23142]}
});

users.insert({ nickname: 'user' + count++,
  location: {type : "Point", coordinates : [45.56369, 10.23142]}
});

users.insert({ nickname: 'user' + count++,
  location: {type : "Point", coordinates : [45.56359, 10.23148]}
});

users.insert({ nickname: 'user' + count++,
  location: {type : "Point", coordinates : [45.56351, 10.2318]}
});

users.insert({ nickname: 'far_user' + count++,
  location: {type : "Point", coordinates : [45.58, 10.24]}
});

users.insert({ nickname: 'far_user' + count++,
  location: {type : "Point", coordinates : [45.59, 10.29]}
});

users.insert({ nickname: 'far_user' + count++,
  location: {type : "Point", coordinates : [45.50, 10.29]}
});

users.index( { "location" : "2dsphere" }, function(err){
  db.close();  
});



