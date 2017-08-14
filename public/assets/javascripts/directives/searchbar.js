(function() {
  angular.module('FFXItem').directive('searchBar', function() {
    return {
      templateUrl: 'views/partials/searchbar.html',
      restrict: 'EA',
      controller: 'SearchController',
      controllerAs: 'SearchCTRL'
    };
  });
})();
