import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChessGame from "../src/ChessGame";

describe("Chess Game", () => {
  test("renders the chessboard", () => {
    render(<ChessGame />);
    const chessboard = screen.getByTestId("chessboard");
    expect(chessboard).toBeInTheDocument();
  });
});
