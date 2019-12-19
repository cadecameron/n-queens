/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined;
  // create a new Board instance using {n: n}
  var testBoard = new Board({n: n});

  // define an inner function to recursively call for each successful piece placement, that takes a single parameter 'row'
  var placeAndCheckSearch = function(row) {
    // iterate through the current row's column elements while solution = undefined
    for (var column = 0; column < n && solution === undefined; column++) {
      // check if the current row equals n. If it does, that means a valid Board was found (set solution = Board)
      if (row === n) {
        solution = _.filter(testBoard.attributes, (value, key) => !isNaN(key));
      } else {
        // place a piece at the current colum in the row
        testBoard.get(row)[column] = 1;

        // check if there's a conflict in the current Board
        if (testBoard.hasAnyRooksConflicts()) {
          // if there is a conflict
          // remove last piece from Board
          testBoard.get(row)[column] = 0;
        } else {
          // if no conflict
          // recursively call inner function, passing in row + 1
          placeAndCheckSearch(row + 1);
        }
      }
    }
  };

  // call inner function with row = 0
  placeAndCheckSearch(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  // create a new Board instance using {n: n}
  var testBoard = new Board({n: n});

  // define an inner function to recursively call for each successful piece placement, that takes a single parameter 'row'
  var placeAndCheckSearch = function(row) {
    // iterate through the current row's column elements while solution = undefined
    for (var column = 0; column < n; column++) {

      // place a piece at the current colum in the row
      testBoard.get(row)[column] = 1;
      var conflict = testBoard.hasAnyRooksConflicts();

      // check if there's a conflict in the current Board
      if (!conflict && row < n - 1) {
        // if no conflict and not on last row
        // recursively call inner function, passing in row + 1
        placeAndCheckSearch(row + 1);
      } else if (!conflict) {
        // no conflict AND last row, means its a solution
        solutionCount++;
      }
      // remove last piece from Board before continuing row iteration
      testBoard.get(row)[column] = 0;
    }
  };

  // call inner function with row = 0
  placeAndCheckSearch(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var solutionFound = false;

  // create a new Board instance using {n: n}
  var testBoard = new Board({n: n});

  // define an inner function to recursively call for each successful piece placement, that takes a single parameter 'row'
  var placeAndCheckSearch = function(row) {
    // iterate through the current row's column elements while solution = undefined
    for (var column = 0; column < n && !solutionFound; column++) {

      // place a piece at the current colum in the row
      testBoard.get(row)[column] = 1;
      var conflict = testBoard.hasAnyQueensConflicts();

      // check if there's a conflict in the current Board
      if (!conflict && row < n - 1) {
        // if no conflict and not on last row
        // recursively call inner function, passing in row + 1
        placeAndCheckSearch(row + 1);
      } else if (!conflict) {
        // no conflict AND last row, means its a solution
        solution = _.filter(testBoard.attributes, (value, key) => !isNaN(key));
        solutionFound = true;
      }
      // remove last piece from Board before continuing row iteration
      if (!solutionFound) {
        testBoard.get(row)[column] = 0;
      }
    }
  };

  // call inner function with row = 0
  placeAndCheckSearch(0);
  if (!solutionFound) {
    solution = _.filter(testBoard.attributes, (value, key) => !isNaN(key));
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
