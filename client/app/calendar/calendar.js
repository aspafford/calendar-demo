;
(function() {
  'use strict';
  angular.module('app.calendar', [])
    .controller('CalendarCtrl', function($scope, $routeParams, Calendar) {

      var day = $routeParams.day;

      $scope.data = {};
      $scope.showCalendar = function() {
        Calendar.getTimeslots(day)
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
