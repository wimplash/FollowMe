"use strict";

angular.module('myApp.routes', ['ngRoute'])

   // configure views; the authRequired parameter is used for specifying pages
   // which should only be available while logged in
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/home', {
         templateUrl: 'partials/login.html',
         controller: 'LoginCtrl'
      });

      $routeProvider.when('/chat', {
         templateUrl: 'partials/chat.html',
         controller: 'ChatCtrl'
      });

      $routeProvider.when('/account', {
         authRequired: true, // must authenticate before viewing this page
         templateUrl: 'partials/account.html',
         controller: 'AccountCtrl'
      });

      $routeProvider.when('/login', {
         templateUrl: 'partials/login.html',
         controller: 'LoginCtrl'
      });
	  
	  $routeProvider.when('/usmap', {
         templateUrl: 'partials/USMap.html',
         controller: 'MapController'
      });
	  
	  $routeProvider.when('/myTrip', {
         templateUrl: 'partials/MyTrip.html',
         controller: 'MyTripController'
      });

        $routeProvider.when('/tripMapPlaceholder', {
            templateUrl: 'partials/tripMap.html',
            controller: 'tripMapController'
        });

        $routeProvider.when('/tripMap', {
            templateUrl: 'partials/leaflet-map.html',
            controller: 'tripMapLeafController'
        });

        $routeProvider.otherwise({redirectTo: '/home'});
   }]);