import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const ChessGame: React.FC = () => {
  const [game] = useState(new Chess());
  const [position, setPosition] = useState<string>(game.fen());
  const [status, setStatus] = useState<string>("Game in progress");

  console.log("status:", status);

  const handleMove = (source: string, target: string) => {
    // Attempt to make the move
    const move = game.move({
      from: source,
      to: target,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // Illegal move
    if (move === null) return false;

    // Update board position
    setPosition(game.fen());
    updateStatus();
    return true;
  };

  // Update status
  const updateStatus = () => {
    let status: string = "";

    let moveColour = "White";
    if (game.turn() === "b") moveColour = "Black";

    // Checkmate?
    if (game.isCheckmate()) {
      status = `Game over, ${moveColour} is in checkmate.`;
    }

    // Draw?
    else if (game.isDraw()) {
      status = "Game over, drawn position";
    }

    // Game still ongoing
    else {
      status = `${moveColour} to move`;

      // Check?
      if (game.inCheck()) {
        status += `, ${moveColour} is in check`;
      }
    }
    console.log("status:", status);
    setStatus(status);
  };
  console.log("history:", game.history());

  return (
    <div data-testid="chessboard">
      <h1>Chess Game</h1>
      {/* <div ref={boardRef} style={{ width: 600 }} /> */}
      <Chessboard
        position={position}
        onPieceDrop={handleMove}
        boardWidth={600}
      />
      <p>{game.pgn()}</p>
    </div>
  );
};

export default ChessGame;
