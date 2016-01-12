;
(function() {
  'use strict';
  angular.module('app.calendar', ['ngMaterial'])
    .controller('CalendarCtrl', function($scope, $routeParams, Calendar) {

      var day = $routeParams.day;

      $scope.data = {};
      $scope.showCalendar = function() {
        Calendar.getTimeslots(day)
          .then(function(data) {
            var formattedData = formatDates(data);
            $scope.data.fullDate = formattedData.fullDate;
            $scope.data.timeslots = formattedData.timeslots;
          })
          .catch(function(error) {
            console.error(error);
          });
      };
      $scope.showCalendar();

      var formatDates = function(data) {

        var fullDateFormat = 'MM/DD/YYYY';
        var timeslotFormat = 'h:mma';

        data.fullDate = moment(data.timeslots[0]['start']).format(fullDateFormat);

        data.timeslots.forEach(function(item, index) {
          data.timeslots[index]['start'] = moment(item.start).format(timeslotFormat);
          data.timeslots[index]['end'] = moment(item.end).format(timeslotFormat);
        });
        return data;
      };
    });
})();
