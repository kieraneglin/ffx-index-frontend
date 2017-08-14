(function() {
  angular.module('FFXItem').controller('arenaTrackerController', ['$scope', '$window', '$http', '$location', 'Upload', '$timeout',
    function($scope, $window, $http, $location, Upload, $timeout) {
      $scope.loading = true;
      $scope.saveVisible = false;

      $window.scrollTo(0,0);

      if (typeof localStorage !== 'undefined') {
        if(localStorage.getItem('ffx-monster-arena') !== null){
          $scope.monsters = JSON.parse(localStorage.getItem('ffx-monster-arena'));

          $http.get('/api/arena/tracker').then(function(res){
            if(res.data.version !== $scope.monsters.version){
              $scope.monsters = res.data;
            }
          });
        } else {
          $http.get('/api/arena/tracker').then(function(res){
            $scope.monsters = res.data;
          });
        }
      } else {
        $http.get('/api/arena/tracker').then(function(res){
          $scope.monsters = res.data;
        });
      }

      $scope.checkCount = function(object){
        if(object.count < 0 || isNaN(object.count)){
          object.count = 0;
        }
        if(object.count > 10){
          object.count = 10;
        }

        if(object.count !== 10){
          object.complete = false;
        } else {
          object.complete = true;
        }
      };

      $scope.markComplete = function(object){
        if(object.count === 10){
          object.count = 9;
        } else {
          object.count = 10;
        }
      };

      $scope.saveProgress = function(object){
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('ffx-monster-arena', JSON.stringify(object));
        }
      };

      $scope.submit = function() {
        if ($scope.form.file.$valid && $scope.file) {
          $scope.upload($scope.file);
        }
      };
      $scope.upload = function (file) {
        Upload.upload({
          url: 'api/readsave',
          data: {file: file}
        }).then(function (resp) {
          // Success
          $scope.monsters = resp.data;
          $scope.saveProgress($scope.monsters);
          $scope.saveVisible = false;
          $scope.uploadSuccess = true;

          $timeout(function(){
            $scope.uploadSuccess = false;
          }, 5000);

        }, function (resp) {
          // Error
          alert("Error: " + resp.data + ". Please ensure you're choosing the correct file and re-upload");
        }, function (evt) {
          // Progress
          // Leaving blank for now, will probably use later
        });
      };
    }
  ]);
})();
