(function() {
  angular.module('FFXItem').controller('searchResultsController', ['$scope', '$window', '$location', '$routeParams','$http',
    function($scope, $window, $location, $routeParams, $http) {
      $window.scrollTo(0,0);

      $scope.loading = true;
      $scope.searchTerm = $routeParams.id.replace(/\-+/g, ' ');
      $scope.sortOrder = 'name';

      $http.get('/api/search/').then(function(res){
        $scope.results = res.data;
        $scope.loading = false;
      });
    }
  ]);
})();
