(function() {
  angular.module('FFXItem').directive('loadingIcon', function() {
    return {
      templateUrl: 'views/partials/loading.html',
      restrict: 'EA'
    };
  });
})();
