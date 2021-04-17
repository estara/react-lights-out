import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // create array-of-arrays
    for (let i = 0; i < nrows; i++) {
      initialBoard.push(Array.from({length: ncols}));
    };
    // insert values
    for (let y = 0; y < initialBoard.length; y++) {
        for (let x = 0; x < initialBoard[y].length; x++) {
          initialBoard[y][x] = <Cell flipCellsAroundMe={flipCellsAround(`${y}-${x}`)} isLit={Math.random() < chanceLightStartsOn}/>;
        };
    };
    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won.
    for (let row of board) {
      for (let cell of row) {
        if (cell) {
          return false;
        };
      };
    };
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        };
      };

      // Make a (deep) copy of the oldBoard
      const oldBoardCopy = [...oldBoard];
      // in the copy, flip this cell and the cells around it
      flipCell(y, x, oldBoardCopy);
      flipCell(y-1, x, oldBoardCopy);
      flipCell(y+1, x, oldBoardCopy);
      flipCell(y, x+1, oldBoardCopy);
      flipCell(y, x-1, oldBoardCopy);

      // return the copy
      return oldBoardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (<p>You won!</p>)
  }

  // make table board
  return (
    <div>
      <Board/>
    </div>
  )
}

export default Board;
