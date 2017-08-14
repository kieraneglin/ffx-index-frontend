(function() {
  angular.module('FFXItem').controller('mixShowController', ['$scope', '$window', '$location', '$routeParams','$http', 'localStorage',
    function($scope, $window, $location, $routeParams, $http, localStorage) {
      var storageKey = 'ffx-mix-' + $routeParams.id;

      $scope.loading = true;
      $window.scrollTo(0,0);
      $scope.sortType = 'item_one.name';

      localStorage.getter($scope, 'mix', storageKey);

      $http.get('/api/mix/' + $routeParams.id).then(function(res){
        localStorage.setter($scope, 'mix', storageKey, res.data);
      });
    }
  ]);
})();
