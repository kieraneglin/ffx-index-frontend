(function() {
  angular.module('FFXItem').controller('keyItemIndexController', ['$scope', '$window', '$http', '$location', 'localStorage',
    function($scope, $window, $http, $location, localStorage) {
      var storageKey = 'ffx-keyitem-all';

      $scope.loading = true;
      $window.scrollTo(0,0);

      $scope.idSort = function(item){
        return parseInt(item.api_details.item.id);
      };

      localStorage.getter($scope, 'items', storageKey);

      $http.get('/api/keyitem/all').then(function(res){
        localStorage.setter($scope, 'items', storageKey, res.data);
      });
    }
  ]);
})();
