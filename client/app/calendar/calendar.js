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

          // format start/end times
          data.timeslots[index]['startTime'] = moment(item.start).format(timeslotFormat);
          data.timeslots[index]['endTime'] = moment(item.end).format(timeslotFormat);
          // calculate timeslot width
          data.timeslots[index]['divWidth'] = formatTimeslot(item.minute_length);
          // calculate timeslot offset
          var date1 = new Date(data.timeslots[0]['start']);
          var date2 = new Date(item.start);
          var diff = date2 - date1;
          var mm = Math.floor(diff / 1000 / 60);
          data.timeslots[index]['divOffset'] = formatTimeslot(mm);
        });
        return data;
      };

      var formatTimeslot = function(duration) {
        // calculate percentage by dividing viewable area into 16 half-hour segments
        return duration / 30 / 16 * 100 + '%'
      }
    })
    .controller('DatePickerCtrl', function($scope, $location, Calendar) {
      this.date = ['1', '2', '3'];
      $scope.change = function(item) {
        Calendar.selectedDay = item;
        $location.path('/calendar/' + item)
      }
      $scope.selected = function(val) {
        return val === Calendar.selectedDay;
      }
    })
    .filter('spaceToDash', function() {
      return function(input) {
        return input.replace(/ /g, '-');
      }
    })
})();
