(function() {
  angular.module('FFXItem').controller('monsterShowController', ['$scope', '$window', '$location', '$routeParams','$http', 'localStorage',
    function($scope, $window, $location, $routeParams, $http, localStorage) {
      var storageKey = 'ffx-monster-' + $routeParams.id;

      $scope.loading = true;
      $window.scrollTo(0,0);

      localStorage.getter($scope, 'monster', storageKey);

      $http.get('/api/monster/' + $routeParams.id).then(function(res){
        localStorage.setter($scope, 'monster', storageKey, res.data);
      });
    }
  ]);
})();
