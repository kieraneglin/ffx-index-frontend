(function() {
  angular.module('FFXItem').controller('monsterIndexController', ['$scope', '$window', '$http', '$location', 'localStorage',
    function($scope, $window, $http, $location, localStorage) {
      var storageKey = 'ffx-monster-all';

      $scope.loading = true;
      $window.scrollTo(0,0);

      localStorage.getter($scope, 'monsters', storageKey);

      $http.get('/api/monster/all').then(function(res){
        localStorage.setter($scope, 'monsters', storageKey, res.data);
      });
    }
  ]);
})();
