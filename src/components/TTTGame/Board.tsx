import { Button, Box, Row, HStack, VStack, Text, Center } from "native-base";
import React, { useState, useEffect } from "react";
import Square from "./Square";
import Mark from "../../types/Mark";

const THREE = 3;

interface IProps {
  playerHasPlayed: (i: number, j: number) => void;
  playerMark: Mark;
  isPlayable: boolean;
}

const Board = ({ playerHasPlayed, playerMark, isPlayable }: IProps) => {
  const initialBoard: Mark[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [squares, setSquares] = useState(initialBoard);
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
    const symbol: Mark = squares[row][col];

    for (var k = 0; k < THREE; k++) {
      if (squares[row][k] === "" || squares[row][k] !== symbol) {
        break;
      }
    }
    if (k === THREE) {
      console.log("1");
      return true;
    }

    for (var k = 0; k < THREE; k++) {
      if (squares[k][col] === "" || squares[k][col] !== symbol) {
        break;
      }
    }
    if (k === THREE) {
      console.log("2");
      return true;
    }

    for (var k = 0; k < THREE; k++) {
      if (squares[k][k] === "" || squares[k][k] !== symbol) {
        break;
      }
    }
    if (k === THREE) {
      console.log("3");
      return true;
    }

    for (var k = 0; k < THREE; k++) {
      if (
        squares[THREE - k - 1][k] === "" ||
        squares[THREE - k - 1][k] !== symbol
      ) {
        break;
      }
    }
    if (k === THREE) {
      console.log("4");
      return true;
    }

    return false;
  };

  const showValue = (/*boardNumber: number,*/ i: number, j: number) => {
    if (hasWon || !isPlayable) return;

    const newSquares = squares.slice();
    if (newSquares[i][j]) return;
    newSquares[i][j] = playerMark;
    setSquares(newSquares);

    if (didWon(i, j)) {
      //TODO need a board number for this
      setHasWon(true);
      return;
    }

    playerHasPlayed(i, j);
  };

  // useEffect(() => {
  //   isPlayable;
  // }, [isPlayable]);

  return (
    <>
      <VStack>
        <Center rounded="lg" p={3} bg={isPlayable ? "red.400" : null}>
          {squares.map((row, i) => (
            <HStack key={i}>
              {row.map((v, j) => (
                <Square
                  key={`${i} ${j}`}
                  value={v}
                  showValue={showValue}
                  i={i}
                  j={j}
                />
              ))}
            </HStack>
          ))}
        </Center>
        <Button onPress={reset} variant="unstyled">
          <Text fontWeight="medium">Reset</Text>
        </Button>
        {hasWon && <Text>{} Winner!</Text>}
      </VStack>
    </>
  );
};

export default Board;
