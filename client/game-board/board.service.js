angular.module('game-board')
  .service('BoardService', function() {
    this.initNewBoard = function(cols, rows, mines) {
      var cellCountCeiling = cols * rows;
      //we will represent mines as an array of coords, which we will use math to determine, with an imaginary array
      var mineCoords = [];
      for (var mineNum=0; mineNum < mines; mineNum++) {
        var newRandom = Math.floor(Math.random()*cellCountCeiling);
        if (mineCoords.indexOf(newRandom) === -1) {
          mineCoords.push(newRandom);
        } else {
          mineNum--;
        }
      }
      return {
        cols: cols,
        rows: rows,
        mines: mineCoords,
        flags: {}
      };
    };
    
    function getCoordinate(totalCols, row, col) {
      return col + (row*totalCols);
    }
    this.getCoordinate = getCoordinate;
    
    this.getNewState = function(cells, row, col) {
      var coordinate = getCoordinate(cells.cols, row, col);
      var mutation = {};
      mutation[coordinate] = { flag: 1 };
      var flags = cells.flags;
      if (coordinate in flags) {
        if ('flag' in flags[coordinate]) {
          var flag = flags[coordinate].flag;
          switch(flag) {
            case 0:
            case 1:
              mutation[coordinate].flag = flag+1;
              break;
            case 2:
              mutation[coordinate].flag = 0;
              break;
          }
        }
      }
      return mutation;
    }
    
    function _getAdjacentRow(totalRows, totalCols, coordinate, offset) {
      var offsetOrigin = coordinate + (offset * totalCols);
      var coords = [];
      var lowerBound = 0;
      var upperBound = (totalCols*totalRows) - 1;
      if (offsetOrigin >= lowerBound && offsetOrigin <= upperBound) {
        if (offset) {
          coords = [ offsetOrigin ];
        }
        var modValue = offsetOrigin % totalCols;
        if (modValue > lowerBound) {
          coords.splice(0, 0, offsetOrigin-1);
        }
        if (modValue !== totalCols-1) {
          coords.push(offsetOrigin+1);
        }
      }
      return coords;
    }
    
    function _checkAdjacent(cells, coordinate) {
      var adjacentCells = [];
      adjacentCells = _getAdjacentRow(cells.rows, cells.cols, coordinate, -1)
        .concat(_getAdjacentRow(cells.rows, cells.cols, coordinate, 0))
        .concat(_getAdjacentRow(cells.rows, cells.cols, coordinate, 1));
        
      return adjacentCells.reduce(function(acc, coord) {
        var rep = {};
        rep.mine = cells.mines.indexOf(coord) !== -1;
        acc[coord] = rep;
        return acc;
      }, {});
    }
    function _exploreBoardAcc(cells, coordinate, mutation) {
      mutation[coordinate] = {
        adjacent: _.reduce(_checkAdjacent(cells, coordinate), function(acc, tileObj) {
          if (tileObj.mine) {
            acc++;
          }
          return acc;
        }, 0)
      };
      //future implementations should include an API for checking the tiles adjacent
      //to tiles that have 0 mines adjacent, as is the behavior in original minesweeper,
      //while ignoring tiles that have flags already.
      return mutation;
    }
    function _exploreBoard(cells, coordinate) {
      return _exploreBoardAcc(cells, coordinate, {});
    }
    
    this.inspectCell = function(cells, row, col) {
      var coordinate = getCoordinate(cells.cols, row, col);
      var mutation;
      if (cells.mines.indexOf(coordinate) !== -1) {
        mutation = { lose: true };
        mutation[coordinate] = { mine: true };
      } else {
        mutation = _exploreBoard(cells, coordinate);
      }
      return mutation;
    };
    
    this.applyMutation = function(cells, mutation) {
      _.merge(cells.flags, mutation);
    };
  });