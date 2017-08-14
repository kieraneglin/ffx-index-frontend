(function() {
  angular.module('FFXItem').controller('mixIndexController', ['$scope', '$window', '$http', '$location', 'localStorage',
    function($scope, $window, $http, $location, localStorage) {
      var storageKey = 'ffx-mix-all';

      $scope.loading = true;
      $window.scrollTo(0,0);

      localStorage.getter($scope, 'mixes', storageKey);

      $http.get('/api/mix/all').then(function(res){
        localStorage.setter($scope, 'mixes', storageKey, res.data);
      });
    }
  ]);
})();
