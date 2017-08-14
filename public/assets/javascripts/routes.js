(function() {
  angular.module('FFXItem').config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          redirectTo: '/search'
        })
        .when('/search', {
          templateUrl: 'views/partials/search.html'
        })
        .when('/search/:id', {
          templateUrl: 'views/partials/search_results.html'
        })
        .when('/mix/all', {
          templateUrl: 'views/partials/mix/index.html'
        })
        .when('/mix/:id', {
          templateUrl: 'views/partials/mix/show.html'
        })
        .when('/monster/all', {
          templateUrl: 'views/partials/monster/index.html'
        })
        .when('/monster/:id', {
          templateUrl: 'views/partials/monster/show.html'
        })
        .when('/item/all', {
          templateUrl: 'views/partials/item/index.html'
        })
        .when('/item/:id', {
          templateUrl: 'views/partials/item/show.html'
        })
        .when('/ability/all', {
          templateUrl: 'views/partials/ability/index.html'
        })
        .when('/ability/:id', {
          templateUrl: 'views/partials/ability/show.html'
        })
        .when('/location/all', {
          templateUrl: 'views/partials/location/index.html'
        })
        .when('/location/:id', {
          templateUrl: 'views/partials/location/show.html'
        })
        .when('/keyitem/all', {
          templateUrl: 'views/partials/keyitem/index.html'
        })
        .when('/keyitem/:id', {
          templateUrl: 'views/partials/keyitem/show.html'
        })
        .when('/arena/tracker', {
          templateUrl: 'views/partials/arena/tracker.html'
        })
        .when('/arena', {
          templateUrl: 'views/partials/arena/index.html'
        })
        .otherwise({
          redirectTo: '/search'
        });

      // To remove those way-lame hashes from URL
      $locationProvider.html5Mode(true);
    }
  ]);
})();
