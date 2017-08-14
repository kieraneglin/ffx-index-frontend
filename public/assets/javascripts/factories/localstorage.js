(function() {
  angular.module('FFXItem')
    .factory('localStorage', ['$http', function localStorageFactory($http) {
      return {
        getter: function storageGetter(scope, varName, key){
          if (typeof localStorage !== 'undefined') {
            if (localStorage.getItem(key) !== null) {
              scope[varName] = JSON.parse(localStorage.getItem(key));
              scope.loading = false;
            }
          }
        },
        setter: function storageSetter(scope, varName, key, res){
          if (typeof localStorage !== 'undefined') {
            if(JSON.stringify(res) !== localStorage.getItem(key)){
              localStorage.setItem(key, JSON.stringify(res));
              scope[varName] = res;
            }
          } else {
            scope[varName] = res;
          }
          scope.loading = false;
        }
      };
  }]);
})();
