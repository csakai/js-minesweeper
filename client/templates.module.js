(function() {
  angular.module("templates", []).run(["$templateCache", function($templateCache) {
$templateCache.put("src/game/game.html", "<div class=\"game-container\"><game-board cols=\"30\" rows=\"15\" mines=\"20\"></game-board></div>");
$templateCache.put("src/game-board/game-board.html", "<div class=\"row\" ng-repeat=\"row in Board.rowArr\"><board-cell class=\"cell\" ng-repeat=\"col in Board.colArr\" state=\"Board.cells.flags[Board.getCoordinate(row, col)]\" on-click=\"Board.clickHandler(type, row, col)\" primary=\"{{::Board.PRIMARY}}\"></board-cell></div>");
$templateCache.put("src/board-cell/board-cell.html", "<div class=\"cell-clickable\" oncontextmenu=\"return false;\" ng-mousedown=\"Cell.clickCell($event)\" ng-class=\"{\'mine\': Cell.state.mine,\'flag\': Cell.state.flag === 1,\'question\': Cell.state.flag === 2,\'adjacent-low\': Cell.state.adjacent &lt; 3,\'adjacent-mid\': Cell.state.adjacent &gt;= 3 &amp;&amp; Cell.state.adjacent &lt; 6,\'adjacent-high\': Cell.state.adjacent &gt;=6 }\">{{Cell.state.adjacent}}</div>");
}]);
})();