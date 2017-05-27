angular.module('game-board')
  .directive('gameBoard', function() {
  function controller($scope, BoardService) {
    this.PRIMARY = 'PRIMARY';
    this.init = function() {
      this.cols = parseInt(this.cols, 10);
      this.rows = parseInt(this.rows, 10);
      this.mines = parseInt(this.mines, 10);
      this.cells = BoardService.initNewBoard(this.cols, this.rows, this.mines);
      
      this.colArr = Array.apply(null, Array(this.cells.cols)).map(function (el, key) { return key; });
      this.rowArr = Array.apply(null, Array(this.cells.rows)).map(function (el, key) { return key; });
    };
    
    $scope.$watch('Board.cells.flags.lose', function(newVal) {
      if (isLose) {
        alert("you lose!");
      }
    });
    
    this.clickHandler = function(type, row, col) {
      var mutation;
      if (type === this.PRIMARY) {
        mutation = BoardService.inspectCell(this.cells, row, col);
      } else {
        mutation = BoardService.getNewState(this.cells, row, col);
      }
      BoardService.applyMutation(this.cells, mutation);
    };
    this.getCoordinate = function(row, col) {
      return BoardService.getCoordinate(this.cells.cols, row, col);
    };
  };
  function link(scope, el, attr, ctrl) {
    ctrl.init();
  }
  return {
    restrict: 'E',
    bindToController: {
      cols: '@',
      rows: '@',
      mines: '@'
    },
    controller: controller,
    controllerAs: 'Board',
    link: link,
    templateUrl: 'src/game-board/game-board.html'
  };
});