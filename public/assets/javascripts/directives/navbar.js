(function() {
  angular.module('FFXItem').directive('navBar', function() {
    return {
      templateUrl: 'views/partials/nav.html',
      restrict: 'EA',
      controller: 'navController',
      controllerAs: 'navCTRL'
    };
  });
})();
