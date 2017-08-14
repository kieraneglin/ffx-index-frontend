(function() {
  angular.module('FFXItem').controller('abilityIndexController', ['$scope', '$window', '$http', '$location', 'localStorage',
    function($scope, $window, $http, $location, localStorage) {
      var storageKey = 'ffx-ability-all';

      $scope.loading = true;
      $window.scrollTo(0,0);
      $scope.sortOrder = 'name';

      localStorage.getter($scope, 'abilities', storageKey);

      $http.get('/api/ability/all').then(function(res){
        localStorage.setter($scope, 'abilities', storageKey, res.data);
      });
    }
  ]);
})();
