import React, { useState } from 'react';

function Chessboard() {
  // State for keeping track of the game
  const [game, setGame] = useState({
    board: [
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
    ],
    turn: 'w',
    selectedSquare: null,
    validMoves: []
  });

  // Function for handling clicks on the chessboard
  function handleSquareClick(row, col) {
    // Determine the piece that was clicked
    const piece = game.board[row][col];

    // If a piece was not selected, select it
    if (!game.selectedSquare) {
      if (piece.toLowerCase() === game.turn) {
        setGame({
          ...game,
          selectedSquare: [row, col]
        });
      }
      return;
    }

    // If a piece was selected, move it
    const [selectedRow, selectedCol] = game.selectedSquare;
    const selectedPiece = game.board[selectedRow][selectedCol];
    if (isValidMove(selectedRow, selectedCol, row, col)) {
      // Make the move
      game.board[selectedRow][selectedCol] = ' ';
      game.board[row][col] = selectedPiece;

      // Update the state
      setGame({
        ...game,
        selectedSquare: null,
        validMoves: [],
        turn: game.turn === 'w' ? 'b' : 'w'
      });
    }
  }

  // Function for determining if a move is valid
  function isValidMove(fromRow, fromCol, toRow, toCol) {
    // Check if the destination square is in the list of valid moves
    if (!game.validMoves.find(move => move[0] === toRow && move[1] === toCol)) {
      return false;
    }

    // Check if the piece is making a legal move
    const piece = game.board[fromRow][fromCol];
    if (piece === 'P' && fromCol !== toCol && game.board[toRow][toCol] === ' ') {
      // En passant capture
      return true;
    }
    if (piece === 'p' && fromCol !== toCol && game.board[toRow][toCol] === ' ') {
      // En passant capture
      return true;
    }

    // Check if the piece is making a legal move
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);
    if (piece === 'P' || piece === 'p') {
    // Pawns can only move forward
    if (piece === 'P' && fromRow > toRow) {
        return false;
    }
    if (piece === 'p' && fromRow < toRow) {
        return false;
    }
    // Pawns can only move one square at a time, unless they are capturing an enemy piece
    if (rowDiff > 1 || colDiff > 1) {
        return false;
    }
    // Pawns can only capture enemy pieces diagonally
    if (colDiff === 1 && rowDiff === 1 && game.board[toRow][toCol] === ' ') {
        return false;
    }
    } else if (piece === 'N' || piece === 'n') {
    // Knights can move in an L-shape: two squares horizontally and one square vertically, or two squares vertically and one square horizontally
    if (rowDiff === 1 && colDiff === 2) {
        return true;
    }
    if (rowDiff === 2 && colDiff === 1) {
        return true;
    }
    return false;
    } else if (piece === 'B' || piece === 'b') {
    // Bishops can move diagonally in any direction
    if (rowDiff === colDiff) {
        return true;
    }
    return false;
    } else if (piece === 'R' || piece === 'r') {
    // Rooks can move horizontally or vertically in any direction
    if (fromRow === toRow || fromCol === toCol) {
        return true;
    }
    return false;
    } else if (piece === 'Q' || piece === 'q') {
    // Queens can move horizontally, vertically, or diagonally in any direction
    if (fromRow === toRow || fromCol === toCol || rowDiff === colDiff) {
        return true;
    }
    return false;
    } else if (piece === 'K' || piece === 'k') {
    // Kings can move one square in any direction
    if (rowDiff <= 1 && colDiff <= 1) {
        return true;
    }
    return false;
    }
    return false;
    }

    return (
    <div className="chessboard">
    {game.board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
        {row.map((piece, colIndex) => (
            <div
            className={`square ${ game.selectedSquare && game.selectedSquare[0] === rowIndex && game.selectedSquare[1] === colIndex ? 'selected' : '' } 
            ${ game.validMoves.find(move => move[0] === rowIndex && move[1] === colIndex) ? 'valid-move' : '' }`}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
            {piece}
            </div>
        ))}
        </div>
    ))}
    </div>

    );
    }
    
    
export default Chessboard;
