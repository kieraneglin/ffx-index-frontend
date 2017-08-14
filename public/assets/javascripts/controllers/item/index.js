(function() {
  angular.module('FFXItem').controller('itemIndexController', ['$scope', '$window', '$http', '$location', 'localStorage',
    function($scope, $window, $http, $location, localStorage) {
      var storageKey = 'ffx-item-all';

      $scope.loading = true;
      $window.scrollTo(0,0);

      localStorage.getter($scope, 'items', storageKey);

      $http.get('/api/item/all').then(function(res){
        localStorage.setter($scope, 'items', storageKey, res.data);
      });
    }
  ]);
})();
