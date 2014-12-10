module.exports = function(req, reply) {
  var _findNearbies = function(lat, lon){
    var query = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lat, lon]
          },
          $maxDistance: 50
        }
      }
    };
    return query;
  };

  return {
    findNearbies: _findNearbies
  };
}();