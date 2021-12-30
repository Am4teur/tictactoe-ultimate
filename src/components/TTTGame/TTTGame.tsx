import { useState } from "react";
import { Button, Box } from "native-base";
import Board from "./Board";

//todo make the string a enum type

const TTTGame = () => {
  const initialBoard: string[][] = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    ["N", "N", "N", "N", "N", "N", "N", "N", "N"],
    ["N", "N", "N", "N", "N", "N", "N", "N", "N"],
    ["N", "N", "N", "N", "N", "N", "N", "N", "N"],
    ["N", "N", "N", "N", "N", "N", "N", "N", "N"],
    ["N", "N", "N", "N", "N", "N", "N", "N", "N"],
    ["N", "N", "N", "N", "N", "N", "N", "N", "N"],
    ["N", "N", "N", "N", "N", "N", "N", "N", "N"],
    ["N", "N", "N", "N", "N", "N", "N", "N", "N"],
  ];
  const [squares, setSquares] = useState(initialBoard);
  const [round, setRound] = useState(0);

  const showValue = (i: number, j: number) => {
    const newSquares = squares.slice();
    if (newSquares[i][j]) return;
    newSquares[i][j] = round % 2 === 0 ? "X" : "O";
    setSquares(newSquares);
    const newRound = round + 1;
    setRound(newRound);
  };

  return <Board squares={squares} showValue={showValue} />;
};

export default TTTGame;
