/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function (n) {
  solution = undefined;
  // create a new Board instance using {n: n}
  testBoard = new Board({ n: n });

  // call inner function with row = 0
  placeAndCheckSearch(0, 'rooks', '1');

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  solutionCount = 0;
  // create a new Board instance using {n: n}
  testBoard = new Board({ n: n });

  placeAndCheckSearch(0, 'rooks', 'all');

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  solution = undefined;

  // create a new Board instance using {n: n}
  testBoard = new Board({ n: n });

  // call inner function with row = 0
  placeAndCheckSearch(0, 'queen', '1');
  if (solution === undefined) {
    solution = _.filter(testBoard.attributes, (value, key) => !isNaN(key));
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  if (n === 0) {
    return 1;
  }
  solutionCount = 0;

  // create a new Board instance using {n: n}
  testBoard = new Board({ n: n });

  // call inner function with row = 0
  placeAndCheckSearch(0, 'queen', 'all');

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// DEFINE GLOBAL VARIABLES
var solutionCount;
var solution;
var testBoard;

var placeAndCheckSearch = function (row, piece, returnType) {
// determine which search mode (1/all)

  // iterate through the current row's column elements while solution = undefined
  for (var column = 0; column < testBoard.get('n') && (returnType === 'all' || solution === undefined); column++) {

    // place a piece at the current colum in the row
    testBoard.get(row)[column] = 1;

    // test for conflicts based on piece
    var conflict = piece === 'queen' ? testBoard.hasAnyQueensConflicts() : testBoard.hasAnyRooksConflicts();

    // check if there's a conflict in the current Board
    if (!conflict && row < testBoard.get('n') - 1) {
      // if no conflict and not on last row
      // recursively call inner function, passing in row + 1
      placeAndCheckSearch(row + 1, piece, returnType);
    } else if (!conflict) {
      // no conflict AND last row, means its a solution
      // update correct global solution varibale based on number of solutions required
      if (returnType === 'all') {
        solutionCount++;
      } else {
        solution = _.filter(testBoard.attributes, (value, key) => !isNaN(key));
      }
    }
    // remove last piece from Board before continuing row iteration
    if (returnType === 'all' || solution === undefined) {
      testBoard.get(row)[column] = 0;
    }
  }
};