angular.module('board-cell')
  .directive('boardCell', function() {
    function controller() {
      this.clickCell = function(event) {
        var type;
        if (event.which === 1) {
          type = this.primary;
        } else {
          type = 'secondary';
        }
        event.preventDefault();
        return this.onClick({
          type: type
        });
      };
    }
    return {
      restrict: 'E',
      bindToController: {
        state: '=',
        onClick: '&',
        primary: '@'
      },
      controller: controller,
      controllerAs: 'Cell',
      templateUrl: 'src/board-cell/board-cell.html'
    };
});