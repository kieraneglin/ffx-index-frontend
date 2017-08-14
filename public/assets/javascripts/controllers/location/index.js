(function() {
  angular.module('FFXItem').controller('locationIndexController', ['$scope', '$window', '$http', '$location', 'localStorage',
    function($scope, $window, $http, $location, localStorage) {
      var storageKey = 'ffx-location-all';

      $scope.loading = true;
      $window.scrollTo(0,0);

      localStorage.getter($scope, 'locations', storageKey);

      $http.get('/api/location/all').then(function(res){
        localStorage.setter($scope, 'locations', storageKey, res.data);
      });
    }
  ]);
})();
