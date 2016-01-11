;
(function() {
  'use strict';

  angular.module('app', [
    'app.calendar',
    'app.services',
    'ngRoute'
  ])

  .config(function($routeProvider) {
    $routeProvider
      .when('/calendar/:day', {
        templateUrl: 'app/calendar/calendar.html',
        controller: 'CalendarCtrl'
      })
      .otherwise({
        redirectTo: '/calendar/1'
      });
  });
})();
