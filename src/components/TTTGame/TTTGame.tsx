import React, { useState } from "react";
import { Button, Box, HStack, Text } from "native-base";
import Board from "./Board";

//todo make the string a enum type
type mark = "X" | "O" | "";
const THREE = 3;

const TTTGame = () => {
  const initialBoard: mark[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [squares, setSquares] = useState(initialBoard);
  const [round, setRound] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  const reset = () => {
    setSquares(initialBoard);
    setHasWon(false);
  };

  const didWon = (row: number, col: number) => {
    // check if row is all === and !== ''
    // [i][j] j++
    // same but colum
    // [i][j] i++
    // same but diagonal
    // [k][k] k++
    const symbol: mark = squares[row][col];

    for (var k = 0; k < THREE; k++) {
      if (squares[row][k] === "" || squares[row][k] !== symbol) {
        break;
      }
    }
    if (k === THREE) return true;

    for (var k = 0; k < THREE; k++) {
      if (squares[k][col] === "" && squares[k][col] !== symbol) {
        break;
      }
    }
    if (k === THREE) return true;

    for (var k = 0; k < THREE; k++) {
      if (squares[k][k] === "" && squares[k][k] !== symbol) {
        break;
      }
    }
    if (k === THREE) return true;

    for (var k = 0; k < THREE; k++) {
      if (squares[k][k] === "" && squares[THREE - k - 1][k] !== symbol) {
        break;
      }
    }
    if (k === THREE) return true;

    return false;
  };

  const incrementRound = () => {
    const newRound = round + 1;
    setRound(newRound);
  };

  const showValue = (/*boardNumber: number,*/ i: number, j: number) => {
    if (hasWon) return;

    const newSquares = squares.slice();
    if (newSquares[i][j]) return;
    newSquares[i][j] = round % 2 === 0 ? "X" : "O";
    setSquares(newSquares);

    if (didWon(i, j)) {
      //TODO need a board number for this
      setHasWon(true);
      return;
    }

    incrementRound();
  };

  return (
    <>
      <Board squares={squares} showValue={showValue} />
      <Button my="4" onPress={reset} shadow="5">
        <Text fontSize="xl" fontWeight="medium">
          Reset
        </Text>
      </Button>
      {hasWon && <Text>{} Winner!</Text>}
    </>
  );
};

export default TTTGame;
