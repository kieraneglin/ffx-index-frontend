(function() {
  angular.module('FFXItem').controller('abilityShowController', ['$scope', '$window', '$location', '$routeParams','$http', 'localStorage',
    function($scope, $window, $location, $routeParams, $http, localStorage) {
      var storageKey = 'ffx-ability-' + $routeParams.id;

      $scope.loading = true;
      $window.scrollTo(0,0);

      localStorage.getter($scope, 'ability', storageKey);

      $http.get('/api/ability/' + $routeParams.id).then(function(res){
        localStorage.setter($scope, 'ability', storageKey, res.data);
      });
    }
  ]);
})();
