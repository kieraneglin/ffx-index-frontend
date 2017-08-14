(function() {
  angular.module('FFXItem').controller('SearchController', ['$scope', '$location',
    function($scope, $location) {
      $scope.search = function() {
        url = angular.element('#linkto').val();
        // Check if the user used typeahead or their own value
        if(url !== '') {
          $location.path(url);
        } else {
          term = angular.element('#main-search').val();
          term = term.replace(/\s+/g, '-').toLowerCase();
          $location.path('/search/' + term);
        }
      };
    }
  ]);
})();
