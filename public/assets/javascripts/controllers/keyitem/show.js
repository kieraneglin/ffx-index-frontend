(function() {
  angular.module('FFXItem').controller('keyItemShowController', ['$scope', '$window', '$location', '$routeParams','$http', 'localStorage',
    function($scope, $window, $location, $routeParams, $http, localStorage) {
      var storageKey = 'ffx-item-' + $routeParams.id;

      $scope.loading = true;
      $window.scrollTo(0,0);

      localStorage.getter($scope, 'item', storageKey);

      $http.get('/api/keyitem/' + $routeParams.id).then(function(res){
        localStorage.setter($scope, 'item', storageKey, res.data);
      });
    }
  ]);
})();
