(function() {
  angular.module('FFXItem').filter('elements', function() {
    return function(input) {
      var element;
      switch (input) {
        case 0:
          element = 'Immune/Absorb';
          break;
        case 0.5:
          element = 'Resistant';
          break;
        case 1:
          element = 'Normal';
          break;
        case 2:
          element = 'Weak';
          break;
      }
      return element;
    };
  });
})();
