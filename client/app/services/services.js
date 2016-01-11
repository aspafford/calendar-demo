angular.module('app.services', [])

.factory('Calendar', function ($http) {

  var getTimeslots = function () {
    return $http({
      method: 'GET',
      url: 'data/day_1.json'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getTimeslots: getTimeslots,
  };
});
