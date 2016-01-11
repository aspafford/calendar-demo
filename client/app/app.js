;
(function() {
  'use strict';

  angular.module('app', ['app.services'])

  .controller('AppCtrl', function($scope, Calendar) {
    $scope.data = {};
    $scope.showCalendar = function() {
      Calendar.getTimeslots()
        .then(function(data) {
          $scope.data.timeslots = data.timeslots;
        })
        .catch(function(error) {
          console.error(error);
        });
    };
    $scope.showCalendar();
  });
})();
