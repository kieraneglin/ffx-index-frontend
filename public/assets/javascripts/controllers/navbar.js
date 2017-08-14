(function() {
  angular.module('FFXItem').controller('navController', ['$scope', '$location', '$routeParams', '$rootScope',
    function($scope, $location, $routeParams, $rootScope) {

      $scope.show = false;

      var hideOnRoot = function(location){
        if(location == '/search' || location == '/'){
          $scope.show = false;
        } else {
          $scope.show = true;
        }
      };

      hideOnRoot($location.path());

      $scope.link = function(){
        $location.path('/');
      };
      $rootScope.$on("$locationChangeStart",function(event, next, current){
        hideOnRoot($location.path());
      });
    }
  ]);
})();
