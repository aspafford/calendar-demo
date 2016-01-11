angular.module('app.services', [])

.factory('Calendar', function ($http) {

  var getTimeslots = function (day) {
    return $http({
      method: 'GET',
      url: 'data/day_' + day + '.json'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getTimeslots: getTimeslots,
  };
});
