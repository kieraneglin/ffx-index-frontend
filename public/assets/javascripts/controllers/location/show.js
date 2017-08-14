(function() {
  angular.module('FFXItem').controller('locationShowController', ['$scope', '$window', '$location', '$routeParams','$http', 'localStorage',
    function($scope, $window, $location, $routeParams, $http, localStorage) {
      var storageKey = 'ffx-location-' + $routeParams.id;

      $scope.loading = true;
      $window.scrollTo(0,0);

      localStorage.getter($scope, 'location', storageKey);

      $http.get('/api/location/' + $routeParams.id).then(function(res){
        localStorage.setter($scope, 'location', storageKey, res.data);
        
        $scope.monsterSplit = [];

        while ($scope.location.monsters.length) {
          $scope.monsterSplit.push($scope.location.monsters.splice(0, 3));
        }
      });
    }
  ]);
})();
