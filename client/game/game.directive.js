angular.module('game')
  .directive('game', function() {
      return {
          restrict: 'E',
          templateUrl: 'src/game/game.html'
      };
  });